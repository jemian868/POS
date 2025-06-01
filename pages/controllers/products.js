app.controller("products", function ($scope) {
  $scope.updateProduct = (data) => {
    $scope.updateProductId = data.id;

    console.log('test', data);
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
    { icon: "fa fa-edit", iconSize: '15px', action: $scope.updateProduct },
    { icon: "fa fa-boxes-stacked", iconSize: '15px', action: $scope.addBTN },
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
    $('#addProductModal').modal('hide');
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
  // GET Category
  $scope.getCategory = async () => {
    const column = [
      { label: "#", type: "counter", field: "counter" },
      { label: "Category", type: "text", field: "category" },
    ]
    const action = [
      { icon: "fa fa-square-check", iconSize: '15px', action: $scope.selectCategory },
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
    $('#addProductModal').modal('hide');
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
  // GET Product Type
  $scope.getType = async () => {
    const column = [
      { label: "#", type: "counter", field: "counter" },
      { label: "Type", type: "text", field: "type" },
    ]
    const action = [
      { icon: "fa fa-square-check", iconSize: '15px', action: $scope.selectType },
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
    $('#addProductModal').modal('hide');
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
  // GET Product Size
  $scope.getSize = async () => {
    const column = [
      { label: "#", type: "counter", field: "counter" },
      { label: "Size", type: "text", field: "size" },
    ]
    const action = [
      { icon: "fa fa-square-check", iconSize: '15px', action: $scope.selectSize },
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
    $('#addProductModal').modal('hide');
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
  // GET Suppliers
  $scope.getSupplier = async () => {
    const column = [
      { label: "#", type: "counter", field: "counter" },
      { label: "Supplier", type: "text", field: "supplier" },
    ]
    const action = [
      { icon: "fa fa-square-check", iconSize: '15px', action: $scope.selectSupplier },
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