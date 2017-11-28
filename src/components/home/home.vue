<template>
	<div>
		<h2>千寻拼图</h2>
		<canvas id="canvas">
		    cannot support canvas
		</canvas>
		<div class="game">
			<div class="game_counter">
				<div class="left">
					<img src="../../assets/clock.png" alt="">
					<span>60秒</span>
				</div>
				<div class="timer">
					
				</div>
			</div>
			<ul class="game_img">
			    <li v-for="(item, index) in imgArr"><img :src="item.src" :index="item.index"></li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	import {getImgChip} from 'common/js/sliceImg'
	export default {
		data() {
			return {
				imgArr: []
			}
		},
		mounted() {
			getImgChip().creatImg('/dist/3.jpg').then((imgArr) => {
				this.imgArr = imgArr;
				console.log(imgArr);
			});
		}
	}
</script>

<style lang="scss" scope>
	#canvas {
	    display: none;
	}

	h2 {
		text-align: center;
		color: #999;
	}


	.game {
		width: 90%;
		margin: 0 auto;
		.game_counter {
			overflow: hidden;

			.left {
				float: left;
				background: #fff;
			    border-radius: 17px;
			    padding: 5px 10px;

			    span {
			    	display: inline-block;
			    	vertical-align: top;
			    }

			    img {
			    	width: 19px;
			    }
			}
		}
		.game_img {
			margin-top: 10px;
		    img {
			    width: 100%;
			    display: block;
			}
			&> li {
			    width: 33%;
			    float: left;
			    list-style: none;
			}
		}
	}
</style>