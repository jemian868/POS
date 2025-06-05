<div class="route-container" ng-init="init()">
  <!-- Header -->
  <div class="route-header">
    <div class="route-header-title">
      <span><i class="fa fa-cart-plus"></i> / Sales</span>
      <b>Sales</b>
    </div>
    <div class="route-header-actions">
      <input ng-model="search" type="text" placeholder="Search here...">
      <i ng-click="logOut()" class="fa fa-circle-user"></i>
    </div>
  </div>

  <!-- Content -->
  <div class="route-content">
    <div class="product-container">
      <custom-table 
        search="search"
        column="product_columns" 
        data="product_data" 
        actions="product_actions">
      </custom-table>
    </div>

    <div class="purchased-container">
      <custom-table 
        column="cart_columns" 
        data="cart_data" 
        actions="cart_actions">
      </custom-table>
      <small>TOTAL AMOUNT: <b>{{totalAmountPaid | currency:'₱ ':2}}</b></small>
      <div class="payment-container">
        <span>CASH</span>
        <div>
          <span>₱</span>
          <input 
            type="text" 
            ng-model="cash"
            ng-change="computeAmount()"
            oninput="this.value = this.value.replace(/[^0-9.]/g, '')">
        </div>

        <span>DISCOUNT</span>
        <div>
          <span>₱</span>
          <input 
            type="text" 
            ng-model="discount" 
            ng-change="computeAmount()"
            oninput="this.value = this.value.replace(/[^0-9.]/g, '')">
        </div>

        <span>CHANGE</span>
        <div>
          <span>₱</span>
          <input type="text" ng-model="change" disabled>
        </div>
        <button class="btn btn-success" ng-click="processPayment()"><i class="fa fa-coins"></i> Purchase</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal -->
<custom-modal
  modal-id="add_to_cart_modal_id"
  modal-title="modal_header"
  input-fields="add_to_cart_quantity">
</custom-modal>

<style>
  .product-container {
    width: 59.5%;
    height: 100%;
    float: left;
    overflow: auto;
  }

  .purchased-container {
    padding: 10px;
    width: 39.5%;
    height: 100%;
    float: right;
    font-size: 12px;
    overflow: auto;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem,
    rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem;
  }
  .purchased-container > small {
    padding: 10px;
    font-size: 13px;
  }

  .payment-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    margin-top: 10px;
  }
  .payment-container > div {
    padding-left: 25px;
    margin-bottom: 10px;
    width: 100%;
    position: relative;
  } 
  .payment-container > div > span {
    font-size: 14px;
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
  }

  .payment-container > div > input {
    padding: 5px;
    width: 100%;
    outline: none;
    border: 1px solid #ccc; 
    border-radius: 5px;
  }
  .payment-container button {
    width: 100%;
    padding: 8px 5px;
    font-size: 13px;
  }
</style>