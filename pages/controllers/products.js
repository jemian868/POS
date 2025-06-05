app.controller("products", function ($scope) {
  $scope.init = async () => {
    const categoryPayload = { path: '../services/category/get.php', }
    const supplierPayload = { path: '../services/supplier/get.php', }
    const sizePayload = { path: '../services/size/get.php', }
    const typePayload = { path: '../services/type/get.php', }

    $scope.category_data = await $scope.get(categoryPayload);
    $scope.type_data = await $scope.get(typePayload);
    $scope.size_data = await $scope.get(sizePayload);
    $scope.supplier_data = await $scope.get(supplierPayload);
  }

  // clear modal props
  $scope.clearModal = () => {
    $scope.modal_header = '';
    $scope.add_stock_field = undefined;
    $scope.input_action = undefined;
    $scope.table_data = undefined;
  }

  $scope.addStock = async (data) => {
    const [quantity, expiry] = data;

    const payload = {
      path: '../services/stock/create.php',
      data: {
        quantity: quantity.value,
        expiry: expiry.value,
        product_id: $scope.product_id,
        account_id: $scope.account_id,
      }
    }

    const response = await $scope.create(payload);
    console.log(response)
    if (response === 'success') {
      $scope.getProduct();
      $('#modal_id').modal('hide');
      myalert.success("SUCCESS!", "Stock added.");
    }
  }

  $scope.openModalAddStock = (data) => {
    $scope.clearModal();

    $scope.modal_header = "Add Stock";
    $scope.add_stock_field = {
      fields: [
        { model: 'addStockQuantityModel', type: 'number', placeholder: 'Enter Quantity' },
        { model: 'addStockExpiryModel', type: 'date', },
      ],
      action: $scope.addStock
    };

    $('#modal_id').modal('show');
    $scope.product_id = data.id;
  }

  $scope.viewToUpdateProduct = (data) => {
    $scope.updateProductId = data.id;
    $scope.addProductName = data.name;
    $scope.addReorderLimit = data.quantity_limit;
    $scope.addProductOriginalPrice = data.original_price;
    $scope.addProductSellingPrice = data.selling_price;
    $scope.addProductCategory = data.category_id;
    $scope.addProductSize = data.size_id;
    $scope.addProductType = data.type_id;
    $scope.addProductSupplier = data.supplier_id;
  }

  $scope.updateProduct = async () => {
    const updateProductForm = [
      { model: $scope.addProductCategory, label: 'Category', rule: 'number' },
      { model: $scope.addProductName, label: 'Product Name', rule: 'required' },
      { model: $scope.addProductType, label: 'Product Type', rule: 'number' },
      { model: $scope.addProductSize, label: 'Product Size', rule: 'number' },
      { model: $scope.addProductOriginalPrice, label: 'Original Price', rule: 'number' },
      { model: $scope.addProductSellingPrice, label: 'Selling Price', rule: 'number' },
      { model: $scope.addReorderLimit, label: 'Reorder Limit', rule: 'number' },
      { model: $scope.addProductSupplier, label: 'Supplier', rule: 'number' },
    ];

    const error = $scope.validateForm(updateProductForm);
    if (error) { myalert.warning('WARNING!', error); return; }

    const payload = {
      path: '../services/product/update.php',
      data: {
        id: $scope.updateProductId,
        name: $scope.addProductName,
        quantity_limit: $scope.addReorderLimit,
        original_price: $scope.addProductOriginalPrice,
        selling_price: $scope.addProductSellingPrice,
        category_id: $scope.addProductCategory,
        size_id: $scope.addProductSize,
        type_id: $scope.addProductType,
        supplier_id: $scope.addProductSupplier,
      }
    }

    const response = await $scope.update(payload);
    if (response === 'success') {
      $scope.getProduct();
      $scope.clearAddProductForm();
      myalert.success("SUCCESS!", "Product updated.");
    }
  }

  $scope.clearAddProductForm = () => {
    $scope.updateProductId = '';
    $scope.addProductName = '';
    $scope.addReorderLimit = '';
    $scope.addProductOriginalPrice = '';
    $scope.addProductSellingPrice = '';
    $scope.addProductCategory = '';
    $scope.addProductSize = '';
    $scope.addProductType = '';
    $scope.addProductSupplier = '';
  }

  $scope.product_columns = [
    { label: "#", type: "counter", field: "counter" },
    { label: "Stock", type: "text", field: "name" },
    { label: "Category", type: "text", field: "category_name" },
    { label: "Type", type: "text", field: "type_name" },
    { label: "Size", type: "text", field: "size_name" },
    { label: "Orginal Price", type: "currency", field: "original_price" },
    { label: "Selling Price", type: "currency", field: "selling_price" },
    { label: "Quantity", type: "text", field: "quantity_stock" },
  ];
  $scope.product_actions = [
    { icon: "fa fa-edit", iconSize: '15px', action: $scope.viewToUpdateProduct },
    { icon: "fa fa-box-open", iconSize: '15px', action: $scope.openModalAddStock },
  ];

  /**
   * 
   * PRODUCT CRUD
   * 
   */
  // GET Product
  $scope.getProduct = async () => {
    try {
      const payload = {
        path: '../services/product/get.php',
      }

      $scope.product_data = await $scope.get(payload);
      $scope.$applyAsync();
    } catch (error) {
      throw error
    }
  }

  // CREATE Product
  $scope.addReorderLimit = 0;
  $scope.createProduct = async () => {
    try {
      const createProductForm = [
        { model: $scope.addProductCategory, label: 'Category', rule: 'number' },
        { model: $scope.addProductName, label: 'Product Name', rule: 'required' },
        { model: $scope.addProductType, label: 'Product Type', rule: 'number' },
        { model: $scope.addProductSize, label: 'Product Size', rule: 'number' },
        { model: $scope.addProductOriginalPrice, label: 'Original Price', rule: 'number' },
        { model: $scope.addProductSellingPrice, label: 'Selling Price', rule: 'number' },
        { model: $scope.addReorderLimit, label: 'Reorder Limit', rule: 'number' },
        { model: $scope.addProductSupplier, label: 'Supplier', rule: 'number' },
      ];

      const error = $scope.validateForm(createProductForm);
      if (error) { myalert.warning('WARNING!', error); return; }

      const payload = {
        path: '../services/product/create.php',
        data: {
          name: $scope.addProductName,
          quantity_limit: $scope.addReorderLimit,
          original_price: $scope.addProductOriginalPrice,
          selling_price: $scope.addProductSellingPrice,
          category_id: $scope.addProductCategory,
          size_id: $scope.addProductSize,
          type_id: $scope.addProductType,
          supplier_id: $scope.addProductSupplier,
        }
      }

      const response = await $scope.create(payload);
      if (response === 'success') {
        $scope.addProductName = '';
        $scope.addProductOriginalPrice = '';
        $scope.addProductSellingPrice = '';
        myalert.success("SUCCESS!", "Product created.");
      }

      $scope.getProduct();
    } catch (error) {
      throw error;
    }
  };

  /**
   * 
   * CATEGORY CRUD
   * 
   */
  // SELECT Category
  $scope.selectCategory = (data) => {
    $scope.addProductCategory = data.id
    $('#modal_id').modal('hide');
  }
  // CREATE Category
  $scope.createCategory = async (data) => {
    try {
      if (data) {
        const payload = {
          path: '../services/category/create.php',
          data: {
            category: data
          },
        }

        const response = await $scope.create(payload);
        response === 'success' ? myalert.success("SUCCESS!", "Category created.") : myalert.warning("WARNING!", "Duplicate category.");
        $scope.getCategory();
      }
    } catch (error) {
      throw error;
    }
  }
  // UPDATE Category
  $scope.viewToUpdateCategory = (data) => {
    $scope.updateCategoryId = data.id;
    $scope.input_action = { model: data.category, placeholder: 'Update category', icon: 'fa fa-edit', action: $scope.updateCategory };
  }
  $scope.updateCategory = async (data) => {
    const payload = {
      path: '../services/category/update.php',
      data: {
        id: $scope.updateCategoryId,
        category: data,
      }
    }

    const response = await $scope.update(payload);
    if (response === 'success') {
      $scope.getCategory();
      $scope.input_action = { placeholder: 'Create category', action: $scope.createCategory }
      myalert.success("SUCCESS!", "Category updated.");
    }
  }
  // GET Category
  $scope.getCategory = async () => {
    $scope.clearModal();

    const column = [
      { label: "#", type: "counter", field: "counter" },
      { label: "Category", type: "text", field: "category" },
    ]
    const action = [
      { icon: "fa fa-square-check", iconSize: '15px', action: $scope.selectCategory },
      { icon: "fa fa-edit", iconSize: '15px', action: $scope.viewToUpdateCategory },
    ];

    const payload = {
      path: '../services/category/get.php',
    }

    $scope.category_data = await $scope.get(payload);
    $scope.$applyAsync();

    $scope.modal_header = "Category";
    $scope.input_action = { placeholder: 'Create category', action: $scope.createCategory }
    $scope.table_data = { // modal table data
      column: column,
      data: $scope.category_data,
      action: action
    }
  }

  /**
   * 
   * PRODUCT TYPE CRUD
   * 
   */
  // SELECT Product Type
  $scope.selectType = (data) => {
    $scope.addProductType = data.id
    $('#modal_id').modal('hide');
  }
  // CREATE Product Type
  $scope.createType = async (data) => {
    try {
      if (data) {
        const payload = {
          path: '../services/type/create.php',
          data: {
            type: data
          },
        }

        const response = await $scope.create(payload);
        response === 'success' ? myalert.success("SUCCESS!", "Product type created.") : myalert.warning("WARNING!", "Duplicate product type.");
        $scope.getType();
      }
    } catch (error) {
      throw error;
    }
  }
  // UPDATE Product Type
  $scope.viewToUpdateType = (data) => {
    $scope.updateTypeId = data.id;
    $scope.input_action = { model: data.type, placeholder: 'Update product type', icon: 'fa fa-edit', action: $scope.updateType };
  }
  $scope.updateType = async (data) => {
    const payload = {
      path: '../services/type/update.php',
      data: {
        id: $scope.updateTypeId,
        type: data,
      }
    }

    const response = await $scope.update(payload);
    if (response === 'success') {
      $scope.getType();
      $scope.input_action = { placeholder: 'Create product type', action: $scope.createType }
      myalert.success("SUCCESS!", "Type updated.");
    }
  }
  // GET Product Type
  $scope.getType = async () => {
    $scope.clearModal();

    const column = [
      { label: "#", type: "counter", field: "counter" },
      { label: "Type", type: "text", field: "type" },
    ]
    const action = [
      { icon: "fa fa-square-check", iconSize: '15px', action: $scope.selectType },
      { icon: "fa fa-edit", iconSize: '15px', action: $scope.viewToUpdateType },
    ];

    const payload = {
      path: '../services/type/get.php',
    }

    $scope.type_data = await $scope.get(payload);
    $scope.$applyAsync();

    $scope.modal_header = "Product Type";
    $scope.input_action = { placeholder: 'Create product type', action: $scope.createType }
    $scope.table_data = { // modal table data
      column: column,
      data: $scope.type_data,
      action: action
    }
  }

  /**
   * 
   * PRODUCT SIZE CRUD
   * 
   */
  // SELECT Product Size
  $scope.selectSize = (data) => {
    $scope.addProductSize = data.id
    $('#modal_id').modal('hide');
  }
  // CREATE Product Size
  $scope.createSize = async (data) => {
    try {
      if (data) {
        const payload = {
          path: '../services/size/create.php',
          data: {
            size: data
          },
        }

        const response = await $scope.create(payload);
        response === 'success' ? myalert.success("SUCCESS!", "Product size created.") : myalert.warning("WARNING!", "Duplicate product size.");
        $scope.getSize();
      }
    } catch (error) {
      throw error;
    }
  }
  // UPDATE Product Size
  $scope.viewToUpdateSize = (data) => {
    $scope.updateSizeId = data.id;
    $scope.input_action = { model: data.size, placeholder: 'Update size', icon: 'fa fa-edit', action: $scope.updateSize };
  }
  $scope.updateSize = async (data) => {
    const payload = {
      path: '../services/size/update.php',
      data: {
        id: $scope.updateSizeId,
        size: data,
      }
    }

    const response = await $scope.update(payload);
    if (response === 'success') {
      $scope.getSize();
      $scope.input_action = { placeholder: 'Create product size', action: $scope.createSize }
      myalert.success("SUCCESS!", "Size updated.");
    }
  }
  // GET Product Size
  $scope.getSize = async () => {
    $scope.clearModal();

    const column = [
      { label: "#", type: "counter", field: "counter" },
      { label: "Size", type: "text", field: "size" },
    ]
    const action = [
      { icon: "fa fa-square-check", iconSize: '15px', action: $scope.selectSize },
      { icon: "fa fa-edit", iconSize: '15px', action: $scope.viewToUpdateSize },
    ];

    const payload = {
      path: '../services/size/get.php',
    }

    $scope.size_data = await $scope.get(payload);
    $scope.$applyAsync();

    $scope.modal_header = "Product Size";
    $scope.input_action = { placeholder: 'Create product size', action: $scope.createSize }
    $scope.table_data = { // modal table data
      column: column,
      data: $scope.size_data,
      action: action
    }
  }

  /**
   * 
   * SUPPLIER CRUD
   * 
   */
  // SELECT Suppliers
  $scope.selectSupplier = (data) => {
    $scope.addProductSupplier = data.id
    $('#modal_id').modal('hide');
  }
  // CREATE Suppliers
  $scope.createSupplier = async (data) => {
    try {
      if (data) {
        const payload = {
          path: '../services/supplier/create.php',
          data: {
            supplier: data
          },
        }

        const response = await $scope.create(payload);
        response === 'success' ? myalert.success("SUCCESS!", "Supplier created.") : myalert.warning("WARNING!", "Duplicate supplier.");
        $scope.getSupplier();
      }
    } catch (error) {
      throw error;
    }
  }
  // UPDATE Supplier
  $scope.viewToUpdateSupplier = (data) => {
    $scope.updateSupplierId = data.id;
    $scope.input_action = { model: data.supplier, placeholder: 'Update supplier', icon: 'fa fa-edit', action: $scope.updateSupplier };
  }
  $scope.updateSupplier = async (data) => {
    const payload = {
      path: '../services/supplier/update.php',
      data: {
        id: $scope.updateSupplierId,
        supplier: data,
      }
    }

    const response = await $scope.update(payload);
    if (response === 'success') {
      $scope.getSupplier();
      $scope.input_action = { placeholder: 'Create supplier', action: $scope.createSupplier }
      myalert.success("SUCCESS!", "Product updated.");
    }
  }
  // GET Suppliers
  $scope.getSupplier = async () => {
    $scope.clearModal();

    const column = [
      { label: "#", type: "counter", field: "counter" },
      { label: "Supplier", type: "text", field: "supplier" },
    ]
    const action = [
      { icon: "fa fa-square-check", iconSize: '15px', action: $scope.selectSupplier },
      { icon: "fa fa-edit", iconSize: '15px', action: $scope.viewToUpdateSupplier },
    ];

    const payload = {
      path: '../services/supplier/get.php',
    }

    $scope.supplier_data = await $scope.get(payload);
    $scope.$applyAsync();

    $scope.modal_header = "Supplier";
    $scope.input_action = { placeholder: 'Create supplier', action: $scope.createSupplier }
    $scope.table_data = { // modal table data
      column: column,
      data: $scope.supplier_data,
      action: action
    }
  }
});