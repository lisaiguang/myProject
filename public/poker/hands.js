/**
 * Created by gapp on 8/27/15.
 */
define(function(){
    var valueTypes = [1/*high*/,2/*pair*/,3/*two pairs*/,4/*three*/,5/*straight*/,6/*flush*/,7/*full house*/,8/*four*/,9/*straight flush*/,10];
    function compare(hand) {
        var v0 = this.getValue(), v1 = hand.getValue();
        if(v0.type > v1.type) return 1;
        if(v0.type == v1.type) return v0.value > v1.value ? 1 : (v0.value == v1.value ? 0 : -1);
        return -1;
    }
    function getValue() {
        var sta = this.getStatistic(), fives = _getFive(sta);
        if (fives.length >= 3) {
            var sameTypes = _getCardsOfSameType(this);
            if (sameTypes.length >= 5) {
                _sortDesc(sameTypes);
                var straight = _getStraight(sameTypes);
                if (straight.length == 5) {
                    var card0 = straight[0];
                    return card0.point == 0 ? {type:10,value:_getCardsValue(straight),cards:straight}:{type:9,value:_getCardsValue(straight),cards:straight};
                }else{
                    var flush = sameTypes.splice(0,5);
                    return {type:6,value:_getCardsValue(flush),cards:flush}
                }
            }else if(fives.length == 5){
                var cards = _sortDesc(this.concat());
                var straight1 = _getStraight(cards);
                if(straight1.length >= 5){
                    return {type:5, value:_getCardsValue(straight1), cards:straight1}
                }else{
                    var highs = cards.splice(0,5);
                    return {type:1, value:_getCardsValue(highs), cards:highs}
                }
            }else{
                var cards = [];
                for(var i = 0; i < fives.length; i++){
                    cards = cards.concat(fives[i]);
                }
                if(fives.length == 3){
                    return {type:fives[0].length==3?4:3,value:_getCardsValue(cards),cards:cards}
                }else{
                    return {type:2,value:_getCardsValue(cards),cards:cards}
                }
            }
        }else{
            var l0 = fives[0], l1 = fives[1], l2 = l0.concat(l1);
            return {type:l0.length == 3 ? 7 : 8 ,value:_getCardsValue(l2), cards:l2}
        }
    }
    //private
    function _getCardsValue(cards) {
        var len = cards.length, v0 = 0;
        for(var i = 0; i < len; i++){
            var card = cards[i], v1 = (card.getValue()+1)/10, base = Math.pow(10,(len-i)*2);
            v0 += v1 * base;
        }
        return v0/10;
    }
    //private
    function _getStraight(cards){
        var l1 = [], len = cards.length;
        for(var i = 0; i < len; i++){
            var ci = cards[i], l0 = [ci];
            if(l1.length >= 5 || len - i < 5)break;
            for(var j = i+1; j < len; j++){
                var cj = cards[j];
                if(cj.getValue() === ci.getValue() - 1){
                    l0.push(cj);
                    ci = cj;
                    if(l0.length >= 5){
                        l1 = l0;
                        break;
                    }
                }
            }
        }
        return l1;
    }
    //private
    function _getCardsOfSameType(cards){
        var diamonds = [], clubs = [], hearts = [], spades = [];
        for(var i = 0; i < cards.length; i++){
            var card = cards[i];
            if(card.type == 0) diamonds.push(card);
            else if(card.type == 1)clubs.push(card);
            else if(card.type == 2)hearts.push(card);
            else if(card.type == 3)spades.push(card);
        }
        if(diamonds.length >= 5) return diamonds;
        if(clubs.length >= 5) return clubs;
        if(hearts.length >= 5) return hearts;
        if(spades.length >= 5) return spades;
        return [];
    }
    //private
    function _getFive(sta){
        var kvs = sta.keyValues, maxKey = sta.maxKey, maxLevel = sta.maxLevel, l0 = [], count = 0;
        while(maxLevel && count < 5){
            for(var i = maxKey; i >= 0; i--){
                var vl = kvs[i];
                if(vl && vl.length == maxLevel){
                    var l1n = Math.min(maxLevel, 5 - l0.length), l1 = vl.splice(0, l1n);
                    l0.push(l1);
                    count += l1n;
                    if(count >= 5)break;
                }
            }
            maxLevel--;
        }
        return l0;
    }
    //private
    function _sortDesc(l){
        for (var i = l.length - 1; i > 0; i--) {
            var f = true;
            for (var j = 0; j < i; j++) {
                var jv = l[j].getValue(), j1v = l[j + 1].getValue();
                if (jv < j1v || (jv == j1v && l[j + 1].type > l[j].type)) {
                    var t = l[j];
                    l[j] = l[j + 1];
                    l[j + 1] = t;
                    f = false;
                }
            }
            if (f)break;
        }
        return l;
    }
    function getStatistic(){
        var cards = this, l = [], maxKey = -1, maxLevel = 1;
        for(var i = 0; i < cards.length; i++){
            var card = cards[i], v = card.getValue();
            if(l[v]){
                var level = l[v].push(card);
                if(level > maxLevel){
                    maxLevel = level;
                }
            }else{
                l[v] = [card];
                if(v > maxKey){
                    maxKey = v;
                }
            }
        }
        return {keyValues:l, maxLevel:maxLevel, maxKey:maxKey};
    }
    var hands = function(cards){
        cards.compare = compare;
        cards.getValue = getValue;
        cards.getStatistic = getStatistic;
        return cards;
    };
    hands.getInstance = function() {
        return this([]);
    };
    return hands;
},module);