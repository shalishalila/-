<template>
	<view fixed>
		 <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback"  @up="upCallback"
		  :down="downOption" :up="upOption">
			
			 </mescroll-body>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
