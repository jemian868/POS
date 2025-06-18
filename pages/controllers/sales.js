app.controller("sales", function ($scope, $http) {
  $scope.init = () => {
    $scope.getCart();
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

    $scope.batchNumber = `${yyyy}${mm}${dd}${hh}${min}${ss}-${$scope.account_id}`;
  }

  $scope.attachPrescription = () => {
    console.log();
  }

  $scope.removeFromCart = async (data) => {
    const payload = {
      path: '../services/cart/delete.php',
      data: {
        id: data.id,
      }
    }

    const response = await $scope.delete(payload);
    if (response === 'success') {
      $scope.getCart();
      myalert.success("SUCCESS!", "Item removed from cart.");
    }
  }

  $scope.computeAmount = () => {
    if ($scope.cash) {
      const cash = parseFloat($scope.cash);
      const discount = $scope.discount ? parseFloat($scope.discount) : 0;
      $scope.change = (cash + discount) - $scope.totalAmountPaid;
    } else {
      $scope.cash = undefined;
      $scope.change = undefined;
    }
  }

  $scope.processPayment = async () => {
    if ($scope.change < 0) {
      myalert.warning("WARNING!", "Unable to process payment.");
    } else {
      const payload = {
        path: '../services/sales/create.php',
        data: {
          account_id: $scope.account_id,
          image: sessionStorage.getItem('uploadedPrescriptionFile'),
          cash: parseFloat($scope.cash - $scope.change),
          discount: $scope.discount,
        }
      }

      const response = await $scope.create(payload);
      if (response === 'success') {
        $scope.getCart();
        $scope.getProduct();
        $scope.generateBatchBumber();
        $scope.cash = undefined;
        $scope.discount = undefined;
        $scope.change = undefined;
        sessionStorage.removeItem('uploadedPrescriptionFile');
        myalert.success("SUCCESS!", "Items sold.");
      } else {
        myalert.error("ERROR!", "Something went wrong.");
      }
    }
  }

  $scope.cart_columns = [
    { label: "#", type: "counter", field: "counter" },
    { label: "ITEM", type: "text", field: "product_name" },
    { label: "TYPE", type: "text", field: "type_name" },
    { label: "SIZE", type: "text", field: "size_name" },
    { label: "PRICE", type: "currency", field: "product_price" },
    { label: "QTY", type: "text", field: "quantity" },
    { label: "TOTAL", type: "currency", field: "total_price" },
  ];
  $scope.cart_actions = [
    { icon: "fa fa-trash", iconSize: '15px', action: $scope.removeFromCart }
  ];
  $scope.getCart = async () => {
    $scope.totalAmountPaid = 0;
    const payload = {
      path: '../services/cart/get.php',
      data: {
        account_id: $scope.account_id,
      }
    }

    const data = await $scope.get(payload);
    $scope.cart_data = data.map(item => {
      const total_price = item.quantity * item.product_price;
      $scope.totalAmountPaid += total_price;
      return {
        ...item,
        total_price
      };
    });
    $scope.$applyAsync();
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

      const response = await $scope.create(payload);
      if (response === 'success') {
        $scope.addToCartQuantity = '';
        $('#add_to_cart_modal_id').modal('hide');
        myalert.success("SUCCESS!", "Added to cart.");
      } else if (response === 'updated') {
        $scope.addToCartQuantity = '';
        $('#add_to_cart_modal_id').modal('hide');
        myalert.success("SUCCESS!", "Quantity added.");
      } else if (response === 'insuficient') {
        myalert.warning("WARNING!", "Quantity exceeds available stock.");
      } else {
        myalert.error("ERROR!", "Product not found.");
      }
      $scope.getCart();
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

  $scope.fillEmpty = true;
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

  // Attach Prescription
  $scope.previewImage = "../../uploads/default.png";
  $scope.previewFile = function (input) {
    const file = input.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.previewImage = e.target.result;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  $scope.uploadImage = function () {
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (!file) {
      myalert.warning('WARNING!', "Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    $http.post("../services/uploadPrescription.php", formData, {
      transformRequest: angular.identity,
      headers: { "Content-Type": undefined },
    }).then(function (response) {
      if (response.data.success) {
        $('#attachPrescriptionModal').modal('hide');
        myalert.success('SUCCESS!', 'Image uploaded.');
        $scope.previewImage = "../../uploads/default.png";
        sessionStorage.setItem('uploadedPrescriptionFile', response.data.filename);
      }
    }).catch(function (error) {
      myalert.warning('WARNING!', error);
    });
  };
});
