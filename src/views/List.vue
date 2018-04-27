<template>
    <div class="listWrap">
        <div class="btnArea">
            <button type="button" class="btnYear current" @click="setData">전체보기</button>
            <button type="button" class="btnYear" v-for="item in data" @click="setData($event, item.year)">{{item.year}}</button>
        </div>
        <div class="projectList">
            <div class="view" v-for="item in dataArr">
                <p class="tit">{{item.title}}</p>
                <p class="txt">{{item.text}}</p>
                <div class="btnWrap">
                    <a v-if="item.url !== ''" :href="item.url" target="_blank" class="btn">작업물보기</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'List',
    props: {
        Data: {
            type: Object
        }
    },
    data(){
        return{
            data: this.Data.allData,
            dataArr: []
        }
    },
    created(){
        this.setData();
    },
    methods: {
        setData(e, year){
            this.dataArr = [];
            if(year === undefined){
                for(var i = 0; i < this.data.length; i++){
                    for(var x = 0; x < this.data[i].data.length; x++){
                        this.dataArr.push(this.data[i].data[x]);
                    }
                }
            } else {
                for(var i = 0; i < this.data.length; i++){
                    if(year === this.data[i].year){
                        for(var x = 0; x < this.data[i].data.length; x++){
                            this.dataArr.push(this.data[i].data[x]);
                        }
                    }
                }
            };
            this.$nextTick( () => {
                if(e !== undefined){
                    $(".btnYear").removeClass("current");
                    $(e.target).addClass("current");
                }
                this.viewInit();
            });
        },

        viewInit(){
            var $view = $(".view");
            var $btnYear = $(".btnYear");
            var viewLength = $view.length;
            $view.each((idx) => { this.handleViewAlign($view.eq((viewLength-1) - idx), idx); });
        },

        handleViewAlign(elem, key){
            var $projectList = $(".projectList");
            var viewW = elem.outerWidth(true);
            var viewH = elem.outerHeight(true);
            var viewGapX = 5;
            var viewGapY = 5;
            var margin = 2.5;
            var viewOuterW = viewW + viewGapX;
            var viewOuterH = viewH + viewGapY;
            var count = parseInt($projectList.width() / (viewW + viewGapX));
            var randomW = Math.floor(Math.random() * (viewOuterW * count - viewOuterW));
            var randomH = Math.floor(Math.random() * (viewOuterH * parseInt(key / count)));
            var settingW = viewOuterW * parseInt(key % count) + margin;
            var settingH = viewOuterH * parseInt(key / count);

            TweenMax.set(elem, { x: randomW, y: randomH, scaleX: .5, scaleY: .5, force3D: true });
            elem.show();
            TweenMax.to(elem, .7, { x: settingW, y: settingH, scaleX: 1, scaleY: 1, opacity: 1, ease: Power1.easeInOut });
            $projectList.css({ "height": viewOuterH * parseInt(key / count) + viewOuterH });
        }
    },
}
</script>

<style scoped>
/* Common */
.btnYear {display:inline-block;height:28px;margin-left:5px;padding:0 5px;border:1px solid #ccc;border-radius:3px;background:#fff;font-size:14px;line-height:28px;}
.btnYear.current {background:#757380;border:1px solid #757380;font-weight:bold;color:#fff;}

/* Contents */
.btnArea {margin-bottom:20px;text-align:right;}

.projectList {position:relative;}
.projectList > .view {position:absolute;top:0;left:0;overflow:hidden;width:208px;height:101px;padding:150px 15px 15px;border:1px solid #e4e4e4;background:#fff;}
.projectList .tit {overflow:hidden;font-weight:bold;font-size:16px;line-height:20px;text-overflow:ellipsis;white-space:nowrap;}
.projectList .txt {overflow:hidden;margin-top:10px;font-size:14px;text-overflow:ellipsis;white-space:nowrap;}
.projectList .btnWrap {padding-top:15px;margin-top:15px;border-top:1px solid #aeb4bd;}
.projectList .btn {display:inline-block;height:28px;padding:0 5px;border:1px solid #ccc;border-radius:3px;font-size:12px;font-weight:bold;line-height:28px;}
</style>