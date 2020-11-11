describe('Testing vending machine app', function(){

    var scope,ctrl,service;
    var q;

    var products_mock = [{"code": 1, "name": "COKE", "price": 10, "count": 0,"img": 'stock_images/COKE.png'},
    {"code": 2, "name": "LUNCHBAR", "price": 10, "count": 0,"img": 'stock_images/LUNCHBAR.png'},
    {"code": 1, "name": "COKE", "price": 10, "count": 0},
    {"code": 1, "name": "COKE", "price": 10, "count": 0},
    {"code": 1, "name": "COKE", "price": 10, "count": 0},
    {"code": 1, "name": "COKE", "price": 10, "count": 0}]

    var coins_mock = [{"value":1, "count":10},{"value":2, "count":10},{"value":5, "count":0},{"value":10, "count":1}]


    beforeEach(module('mainApp'));
    
    beforeEach(inject(function($controller,$rootScope,$q){
        scope = $rootScope.$new();
      
        service = jasmine.createSpyObj('dataService', ['getProducts','getCoins','updateCoins','purchaseProduct']);
        q = $q;
        service.getProducts.and.returnValue(q.when( {data:products_mock}));
        service.getCoins.and.returnValue(q.when( {data:coins_mock}));
        service.getCoins.and.returnValue(q.when( {data:[]}));
        scope.$apply();
        ctr = $controller('VendingController',{$scope:scope,dataService:service});
        
    }));

    describe('Testing VendingController', function(){
     
        beforeEach(function () {
            // service.getProducts.and.returnValue(q.when({ result: [] }));
            scope.$apply();
            // ctrl = ('VendingController',{$scope:scope,dataService:service})

        });
        
        it('should have correct initial state values ', function(){
            q.defer().resolve();

            expect(scope.balance).toBe(0);
            expect(scope.coin_denominations).toEqual([1, 2, 5, 10]);
            expect(scope.product_available).toBe(true);
            expect(scope.sufficient_balance).toBe(true);
        })

        it('should have correct formating of data after formating products', function(){
            q.defer().resolve();
            var formated_data = scope.formatData(products_mock)
            expect(scope.products).toEqual(formated_data);
            
        })

        

        it('coin index function should work faccordingly', function(){
            expect(scope.index_coin(coins_mock,1)).toEqual({'value':1,'count':10});
            expect(scope.index_coin(coins_mock,3)).toBeUndefined();
        })

        it('fmake change function should work accordingly', function(){
            expect(scope.make_change(coins_mock,3)).toEqual({'1':1,'2':1,'5':0,'10':0});
            expect(scope.make_change(coins_mock,10)).toEqual({'1':0,'2':0,'5':0,'10':1});
            
        })

        it('find product function should work accordingly', function(){
            expect(scope.findProduct(1)).toEqual({"code": 1, "name": "COKE", "price": 10, "count": 0,"img": 'stock_images/COKE.png'});
            expect(scope.findProduct(2)).toEqual({"code": 2, "name": "LUNCHBAR", "price": 10, "count": 0,"img": 'stock_images/LUNCHBAR.png'});
            expect(scope.findProduct(20)).toBeUndefined();
        })

        
    });
});
