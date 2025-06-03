<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Profile Details</title>
    <link rel="icon" href="../../images/logo.png" />
    <link
      rel="stylesheet"
      type="text/css"
      href="../../assets/bootstrap/bootstrap.min.css" />
    <link
      rel="stylesheet"
      type="text/css"
      href="../../assets/fontawesome/css/all.css" />
    <link
      rel="stylesheet"
      type="text/css"
      href="../../assets/fontawesome/css/all.min.css" />
  </head>
  <body>
    <div class="main-container">
      <div class="personal-details-container">
        <div class="fullname-container">
          <div class="image-wrapper"> <img src="../../images/bryan.jpg"> </div>
          <span>BRYAN VILLARUBIA</span><br/>
          <small>
            <i class="fa fa-venus-mars"></i>: Male <br/>
            <i class="fa fa-calendar"></i>: August 21, 1996 <br/>
            <i class="fa fa-mobile-retro"></i>: 09123456789 <br/>
            <i class="fa fa-map-location"></i>: Molave Zamboanga Del Sur
          </small>
        </div>
      </div>
    </div>
  </body>
</html>

<style>
  html,
  body {
    height: 100%;
    margin: 0;
    font-family: "Poppins", sans-serif;
  }

  .main-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .personal-details-container {
    padding: 50px 10%;
    width: 100%;
    background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));
  }
  .fullname-container {
    padding: 5px 5px 5px 170px;
    width: 100%;
    height: 220px;
    font-weight: 600;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .fullname-container span {
    color: #f3f3f3;
    font-size: 35px;
  }
  .fullname-container small {
    color: #f3f3f3;
    font-size: 20px;
    line-height: 35px;
  }
  .image-wrapper {
    padding: 5px;
    position: absolute;
    top: 20px; left: 0;
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 50%;
    border: 2px solid #f3f3f3;
  }
  .image-wrapper img {
    height: 100%;
    border-radius: 50%;
  }

  @media print {
    body {
      -webkit-print-color-adjust: exact !important; /* Chrome/Safari */
      print-color-adjust: exact !important;         /* Modern browsers */
    }

    .personal-details-container {
      background: rgb(66, 66, 74) !important;
      color: white;
    }

    /* Optional: remove elements that are unnecessary in print */
    .image-wrapper {
      border: none;
    }
  }
</style>
