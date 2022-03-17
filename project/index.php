<!DOCTYPE html>

    <html>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <title>Test</title>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="./assets/style.css">
        <link rel="stylesheet" type="text/css" href="./assets/map.css">
        <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    </head>

    <body>
        <div class="header">
            <h1>Retrive Cinema Near Me</h1>
        </div>

        <div class="container">
            <div class="row">
                <h3 style="margin-top: 50px; text-align: center; font-family: ProbaPro-Bold,Arial,sans-serif;">Where’s my nearest Cinema branch?</h3>
            </div>
            <div class="row search-form">
                <center style="margin-top:10px;">
                    <input id="postcode" type="text" class="form-control" style="max-width: 400px; font-size: 1.5em;text-align:center; color: #4c4848;" name="postcode" id="postcode" placeholder="Enter Postcode">
                    <div class="alert alert-danger" style=" display: none; margin-top:10px" role="alert">
                        Sorry the postcode you entered does not seem to be valid. Please check and enter it again.
                    </div>
                    <button id="btn-search" class="btn btn-primary">Search</button>
                </center>
            </div>

            <div class="map-view" style="display: none; margin-bottom:20px;">
                <div style="text-align: end; margin-bottom:10px;">
                    <a id="btn-search-again" style="border-radius: 2em; color:red; cursor:pointer;">
					Search again</a>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <div id="map"></div>
                        <div id="infowindow-content">
                            <span id="place-name" class="title"></span><br />
                            <strong>Place ID:</strong> <span id="place-id"></span><br />
                            <span id="place-address"></span>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="default-show">
                        </div>

                        <div class="row" style="text-align: left; margin-top: 10px;">
                            <a href="#" id="btn-more-show">Show more branches</a>
                            <input type="hidden" value="hide">
                        </div>
                        <div class="more-show" style="display: none;">
                        </div>
                    </div>
                </div>

            </div>

            <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
            <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"></script>
            <script type="text/javascript" src="./assets/map.js"></script>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTPTNXIrRBur4aVF1fJCQYU-2AIltLAGU&v=weekly" async></script>
            <script type="text/javascript" src="./assets/index.js"></script>
    </body>

    </html>