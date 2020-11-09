var mainApp = angular.module("mainApp",[]);

mainApp.controller( "VendingController", function( $scope,dataService){
    $scope.products;
    $scope.products_sequential;
    $scope.balance = 0;
    $scope.coin_denominations = [1, 2, 5, 10];
    $scope.product_available = true;
    $scope.sufficient_balance = true;

    //Loading spinner
    $scope.hideLoader = true;
    $scope.shrinkOnHide = false;
    $scope.toggle_spinner = function () {
        $scope.hideLoader = !$scope.hideLoader;
    };

    $scope.insert_coin = function(d){
        $scope.balance+=d;
    }

    // retrieve products
    $scope.getProducts = function() {
        $scope.toggle_spinner();
        dataService.getProducts().then(function onSuccess(response) {
            var results = response.data;
            console.log(response)
            $scope.products_sequential = results;
            $scope.products = $scope.formatData(results);
            $scope.toggle_spinner();
            console.log(results);
            console.log($scope.hideLoader);
        }, function onError(response) {
            $scope.toggle_spinner();
            console.log("data retrival error "+response.statusText);
        });

    
    }

    $scope.reloadProducts = function(){
        $scope.getProducts();
    }

    $scope.getProducts();
    

    // $scope.init_products(12);
    $scope.reset = function(){
        $scope.product_available = true;
        $scope.sufficient_balance = true;
    }

    // format retrieved data
    $scope.formatData = function(data) {
        formatted_data = []
        var n_cols = 3;
        var n_rows = Math.ceil(data.length/n_cols);
        console.log(n_rows,n_cols);
    
        for(var i=0;i<n_rows;i++){
            var row = [];
            for(var j=0;j<n_cols;++j){
                if(i*n_cols+j < data.length){
                    data[i*n_cols+j].img = "stock_images/"+data[i*n_cols+j].name+".png";
                    row.push(data[i*n_cols+j]);
                }
            }
            formatted_data.push(row);
        }

        console.log(formatted_data);
        return formatted_data;
    }

    $scope.findProduct = function(code){
        for(var i=0;i<$scope.products_sequential.length;++i){
            var product = $scope.products_sequential[i];

            if(product.code===code){
                return product;
            }
        }
    }
    // validating  a purchase
    $scope.finalizePurchase = function(){
        var product = $scope.findProduct($scope.selected_product);
        
        if(product!=null && product.count>0){
            $scope.product_available = true;
            // now check we have the required balance >= price
            if($scope.balance>=product.price){
                $scope.sufficient_balance = true;

                $scope.toggle_spinner();
                dataService.purchaseProduct(product.code).then(function onSuccess(response) {
                    var results = response.data;
                    $scope.products_sequential = results;
                    $scope.products = $scope.formatData(results);
                    $scope.balance = $scope.balance-product.price;
                    $scope.toggle_spinner();
                    alert("Purchase succesful");
                }, function onError(response) {
                    $scope.toggle_spinner();
                    console.log("purchase  error "+response.statusText);
                });
            }

            else{
                $scope.sufficient_balance = false;
            }
        }

        else{
            $scope.product_available = false;
        }
        
    }

    //making a refund
    $scope.user_change;
    $scope.change_amount = 0;
    $scope.set_initial_change = function(){ $scope.user_change = {1:0, 2:0, 5:0, 10:0};}
    $scope.set_initial_change();
    $scope.make_change = function(curr_coins, amount){
        max_denomination = $scope.coin_denominations.length-1;
        change = {1:0, 2:0, 5:0, 10:0};
        curr_amount = amount;
        while(curr_amount>0 && max_denomination>=0){
            coin_value = $scope.coin_denominations[max_denomination];
            if(coin_value<=curr_amount && $scope.index_coin(curr_coins, coin_value).count>0){
                change[coin_value]++;
                curr_amount-=coin_value;
            }else{
                max_denomination-=1;
            }
        }
        console.log(change)
        return change;
    }

    $scope.index_coin =function(coins, coin_value){
        for(var i=0;i<coins.length;i++){
            if(coins[i].value==coin_value)return coins[i];
        }
    }

    $scope.getChange = function(){
        $scope.toggle_spinner();
        dataService.getCoins().then(function onSuccess(response) {
            var results = response.data;
            $scope.user_change = $scope.make_change(results, $scope.balance);
            $scope.updateCoins($scope.user_change)
            // set_initial_change();
        }, function onError(response) {
            $scope.toggle_spinner()
            console.log("data retrival error "+response.statusText);
        });

    }

    $scope.updateCoins = function(change) {
        dataService.updateCoins(change).then(function onSuccess(response) {
            var results = response.data;
            $scope.change_amount = $scope.balance;
            $scope.balance = 0;
            $scope.toggle_spinner();
            console.log(results)
        }, function onError(response) {
            $scope.toggle_spinner()
            console.log("data retrival error "+response.statusText);
        });
    }




});