/**
 * Created by liuyujing on 16/8/29.
 */

$(function () {

    function Card(width,height) {
        var self = {};
        var htmlNode;
        var divA,divB;
        var aVisible = true;
        var animating = false;

        self.getHtmlNode = function () {
            return htmlNode;
        };

        self.getWidth = function () {
            return width;
        };

        self.getHeight = function () {
            return height;
        };

        function addListener() {
            //绑定一个 还未出现的元素
            htmlNode.delegate("div","click",function () {
                aVisible == true ?self.returnB():self.returnA();
            });
        }

        self.showA = function () {
            aVisible = true;
            divA.css("display","block");
            divB.css("display","none");

        };
        self.showB = function () {
            divA.css("display","none");
            divB.css("display","block");
            aVisible = false;
        };
        self.returnB = function () {
          if (!animating && aVisible) {
              animating = true;
              divA.stop().animate({width:"10px"},1000,function () {
                  divB.css("width","0px");
                  self.showB();
                  animating = false;
                divB.stop().animate({width:"100px"},1000);
              });
          }
        };

        self.returnA = function () {
            if (!animating && !aVisible) {
                animating = true;
                divB.stop().animate({width:"10px"},1000,function () {
                    divA.css("width","0px");
                    self.showA();
                    animating = false;
                    divA.stop().animate({width:"100px"},1000);
                });
            }
        };

        function init() {

            htmlNode = $("<div></div>").appendTo($("body"));
            htmlNode.addClass("card");
            htmlNode.css("width",width+"px");
            htmlNode.css("height",height+"px");

            divA =  $("<div></div>");
            divA.addClass("div-a card-content");
            htmlNode.append(divA);

            divB = $("<div></div>");
            divB.addClass("div-b card-content");
            htmlNode.append(divB);

            self.showA();
            addListener();
        }

        init();
        return self;
    }
    window.Card = Card;
});
