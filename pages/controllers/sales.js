app.controller("sales", function ($scope) {
  $scope.init = () => {
    $scope.getProduct();
    $scope.generateBatchBumber();
  }

  $scope.generateBatchBumber = () => {
    /**
     * batch number format: yyyymmddhhmmss-account_id
     */
    const now = new Date();

    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const dd = String(now.getDate()).padStart(2, '0');

    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    $scope.batchNumber = `${yyyy}${mm}${dd}${hh}${min}${ss}-1`;
    console.log($scope.batchNumber);
  }

  $scope.addToCart = async (data) => {
    try {
      const [quantity] = data;

      if (!quantity.value) { myalert.warning("WARNING!", "Quantity is required."); return }

      const payload = {
        path: '../services/cart/create.php',
        data: {
          account_id: $scope.account_id,
          product_id: $scope.addToCartProductId,
          quantity: quantity.value,
          batch_number: $scope.batchNumber,
        }
      }

      console.log(payload.data)

      const response = await $scope.create(payload);
      if (response === 'success') {
        $scope.addToCartQuantity = '';
        $('#add_to_cart_modal_id').modal('hide');
        myalert.success("SUCCESS!", "Added to cart.");
      } else if (response === 'insuficient') {
        myalert.warning("WARNING!", "Quantity exceeds available stock.");
      } else {
        myalert.error("ERROR!", "Product not found.");
      }
    } catch (error) {
      throw error
    }
  }
  $scope.openModal = (data) => {
    $('#add_to_cart_modal_id').modal('show');

    $scope.addToCartProductId = parseInt(data.id);

    $scope.modal_header = "Add to cart";
    $scope.add_to_cart_quantity = {
      fields: [
        { model: 'addToCartQuantity', type: 'number', placeholder: 'Enter Quantity' }
      ],
      action: $scope.addToCart
    };
  }

  $scope.product_columns = [
    { label: "#", type: "counter", field: "counter" },
    { label: "Product", type: "text", field: "name" },
    { label: "Type", type: "text", field: "type_name" },
    { label: "Size", type: "text", field: "size_name" },
    { label: "Price", type: "currency", field: "selling_price" },
    { label: "Quantity", type: "text", field: "quantity_stock" },
  ];
  $scope.product_actions = [
    { icon: "fa fa-cart-arrow-down", iconSize: '15px', action: $scope.openModal }
  ];
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
});
