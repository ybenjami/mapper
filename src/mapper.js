var objectMapper = require('object-mapper');

const src = {
        "offer":[
            {
              "offerActiveDate":"2011-02-16T07:00:00-05:00",
              "offerDescription":"$0.75 off 2 Renuzit Adjustable Air Freshener",
              "offerExpiryDate":"2013-02-16T07:00:00-05:00",
              "offerRedemptionStartDate":"2013-02-20T07:00:00-05:00",
              "offerId":"OFID041",
              "offerUPC":"10101345",
              "offerUpdateDate":"2014-09-05T06:20:20-08:00",
              "discountType":"ITEM_LEVEL",
              "purchaseUnit":"Item",
              "rewardUnit":"Item",
              "offerValue":"0.75",
              "offerImage":{
                "offerImage1":"http://coupons/_ImageCache/077/17673077.gif",
                "offerImage2":"http://coupons/_ImageCache/077/17673077a.gif"
              },
              "hierarchy":{
                "categoryLevel1":"Grocery",
                "categoryLevel2":"Air Fresheners & Deodorizer"
              },
              "offerConditions":{
                "redemptionFrequency":"OnceTimeOffer",
                "redemptionLimit":"1",
                "minBasketValue":"10.00",
                "minTripCount":"1",
                "shopXtimes":"1",
                "minQty":"1",
                "offerType":"AmountOff"
              },
              "upc":[
                1234,
                444,
                555
              ]
            },
            {
                "offerActiveDate":"2011-02-16T07:00:00-05:00",
                "offerDescription":"$1.00 off Sanka Coffee",
                "offerExpiryDate":"2013-02-16T07:00:00-05:00",
                "offerRedemptionStartDate":"2013-02-20T07:00:00-05:00",
                "offerId":"OFID042",
                "offerUPC":"10101345",
                "offerUpdateDate":"2014-09-05T06:20:20-08:00",
                "discountType":"ITEM_LEVEL",
                "purchaseUnit":"Item",
                "rewardUnit":"Item",
                "offerValue":"0.75",
                "offerImage":{
                  "offerImage1":"http://coupons/_ImageCache/077/17673077.gif",
                  "offerImage2":"http://coupons/_ImageCache/077/17673077a.gif"
                },
                "hierarchy":{
                  "categoryLevel1":"Grocery",
                  "categoryLevel2":"Coffee",
                  "categoryLevel3":"Breakfast",

                },
                "offerConditions":{
                  "redemptionFrequency":"OnceTimeOffer",
                  "redemptionLimit":"1",
                  "minBasketValue":"10.00",
                  "minTripCount":"1",
                  "shopXtimes":"1",
                  "minQty":"1",
                  "offerType":"AmountOff"
                },
                "upc":[
                  3455,
                  34534,
                  654
                ]
              }
   ],
   }

   const mapper = {
       "offer[]": {
        "key": "results",
        "transform": (val) => mappingFunction(val)
    }
};

const mappingFunction = (val) => {
    return val.map(item => {
        const lineMapper = {
            "offerId": "id",
            "offerDescription": "offer",
            "offerValue": "value",
            "hierarchy":{
                "key": "categories",
                "transform": (value) => Object.values(value).join()
            }, 
            "upc[]": {
                "key": "skus",
                "transform": (item) => item.join()
            }
        }
        return objectMapper(item, lineMapper);

    });

}

   const init = () => objectMapper(src, mapper);

   module.exports = { init }
