/**
 * Created by gapp on 8/27/15.
 */
define(function(){
    function compareHand(hand){
        var cards = this;
    }
    function getValue(){
        var cards = this;
    }
    function predict(){
        var cards = this;
    }
    return function(cards){
        cards.compareHand = compareHand;
        cards.getValue = getValue;
        cards.predict = predict;
    };
},module);