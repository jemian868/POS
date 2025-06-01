<div class="route-container" ng-init="getProduct(); init()">
  <!-- Header -->
  <div class="route-header">
    <div class="route-header-title">
      <span><i class="fa fa-pills"></i> / Products</span>
      <b>Products</b>
    </div>
    <div class="route-header-actions">
      <input ng-model="search" type="text" placeholder="Search here...">
      <i class="fa fa-circle-user"></i>
    </div>
  </div>

  <!-- Content -->
  <div class="route-content">
    <div class="add-product-container">
      <small>PRODUCT DETAILS</small>
      <span>CATEGORY</span>
      <div class="select-container">
        <select ng-model="addProductCategory" disabled>
          <option ng-repeat="i in category_data" value="{{i.id}}">{{ i.category }}</option>
        </select>
        <i class="fa fa-plus" ng-click="getCategory()" data-toggle="modal" data-target="#modal_id"></i>
      </div>
      <span>PRODUCT NAME</span>
      <input ng-model="addProductName" type="text">
      <span>PRODUCT TYPE</span>
      <div class="select-container">
        <select ng-model="addProductType" disabled>
          <option ng-repeat="i in type_data" value="{{i.id}}">{{ i.type }}</option>
        </select>
        <i class="fa fa-plus" ng-click="getType()" data-toggle="modal" data-target="#modal_id"></i>
      </div>
      <span>PRODUCT SIZE</span>
      <div class="select-container">
        <select ng-model="addProductSize" disabled>
          <option ng-repeat="i in size_data" value="{{i.id}}">{{ i.size }}</option>
        </select>
        <i class="fa fa-plus" ng-click="getSize()" data-toggle="modal" data-target="#modal_id"></i>
      </div>
      <span>PRODUCT ORIGINAL PRICE</span>
      <input ng-model="addProductOriginalPrice" type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '')">
      <span>PRODUCT SELLING PRICE</span>
      <input ng-model="addProductSellingPrice" type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '')">
      <span>REORDER LIMIT</span>
      <input ng-model="addReorderLimit" type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '')">
      <span>SUPPLIER</span>
      <div class="select-container">
        <select ng-model="addProductSupplier" disabled>
          <option ng-repeat="i in supplier_data" value="{{i.id}}">{{ i.supplier }}</option>
        </select>
        <i class="fa fa-plus" ng-click="getSupplier()" data-toggle="modal" data-target="#modal_id"></i>
      </div>
      
      <div class="buttons-container">
        <button ng-if="!updateProductId" ng-click="createProduct()" class="btn btn-success"><i class="fa fa-plus"></i> Create Product</button>
        <button ng-if="updateProductId" ng-click="updateProduct()" class="btn btn-primary"><i class="fa fa-edit"></i> Update </button>
        <button ng-if="updateProductId" ng-click="clearAddProductForm()" class="btn btn-danger"><i class="fa fa-times"></i> Cancel</button>
      </div>
    </div>

    <div class="product-container">
      <custom-table 
        search="search"
        column="product_columns" 
        data="product_data" 
        actions="product_actions">
      </custom-table>
    </div>
  </div>
</div>

<!-- Modal -->
<custom-modal
  modal-id="modal_id"
  modal-title="modal_header"
  modal-size="modal-lg"
  input-fields="add_stock_field"
  input-action="input_action"
  table-data="table_data">
</custom-modal>

<style>
  .product-container {
    width: 59.5%;
    height: 100%;
    float: right;
    overflow: auto;
  }

  .add-product-container {
    padding: 10px;
    width: 39.5%;
    height: 100%;
    float: left;
    font-size: 12px;
    overflow: auto;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem,
    rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem;
  }
  .add-product-container small {
    padding: 13px 5px;
    font-weight: bold;
  }
  .add-product-container > input {
    padding: 5px;
    margin-bottom: 10px;
    outline: none;
    border: 1px solid #ccc; 
    border-radius: 5px;
  }
  .buttons-container {
    display: flex;           /* Enable flex layout */
    flex-direction: row;     /* Align children in a row (horizontal) */
    justify-content: flex-start;  /* Align items to the start (left) */
    align-items: center;     /* Optional: vertically center the items */
    gap: 16px;  
  }
  .buttons-container > button {
    min-width: 25%;
    padding: 10px 15px;
    font-size: 13px;
  }
  .select-container {
    padding: 0 45px 0 0;
    margin-bottom: 10px;
    position: relative;
    border: 1px solid #ccc; 
    border-radius: 5px;
    background: #f0f0f0;
  }
  .select-container select {
    width: 100%;
    height: 100%;
    padding: 7px 5px;
    outline: none;
    border: none;
    background: #fff;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    appearance: none;
  }
  .select-container i {
    padding: 7px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #344767;
    cursor: pointer;
    font-weight: 900;
  }
</style>