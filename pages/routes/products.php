<div class="route-container">
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
        <input type="text" disabled value="- Select Category -">
        <i class="fa fa-plus"></i>
      </div>
      <span>PRODUCT NAME</span>
      <input type="text">
      <span>PRODUCT TYPE</span>
      <div class="select-container">
        <input type="text" disabled value="- Select Product Type -">
        <i class="fa fa-plus"></i>
      </div>
      <span>PRODUCT DOSAGE</span>
      <div class="select-container">
        <input type="text" disabled value="- Select Product Size -">
        <i class="fa fa-plus"></i>
      </div>
      <span>PRODUCT ORIGINAL PRICE</span>
      <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '')">
      <span>PRODUCT SELLING PRICE</span>
      <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '')">
      <span>SUPPLIER</span>
      <div class="select-container">
        <input type="text" disabled value="- Select Supplier -">
        <i class="fa fa-plus"></i>
      </div>
      
      <button class="btn btn-success"><i class="fa fa-box"></i> Add Product</button>
    </div>

    <div class="product-container">
      <custom-table 
        search="search"
        column="stocks_columns" 
        data="stocks_data" 
        actions="stocks_actions">
      </custom-table>
    </div>
  </div>
</div>

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
  .add-product-container button {
    width: 100%;
    padding: 5px;
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
  .select-container input {
    width: 100%;
    height: 100%;
    padding: 5px;
    outline: none;
    border: none;
    background: #fff;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
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