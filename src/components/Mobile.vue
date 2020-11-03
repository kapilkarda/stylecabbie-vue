
<template>
	<div>
		<div class="p-grid">
			<div class="p-col-4"><a href="/">Home</a></div>
		</div>
		<div class="p-grid">
			<div class="p-col-4">
				<TabView>
					<TabPanel header="Text">
						<div>
							<h4 class="widget-title">
								Add New Text
							</h4>
							<span class="p-field">
								<label for="text">Type here</label>
								<InputText id="text" type="text" v-model="textData" />
							</span>
							<span class="p-field">
								<label for="text">Text Size</label>
								<InputText v-model.number="fontSize" />
								<Slider v-model="fontSize" />
							</span>
							<span class="p-field">
								<label for="text">Text Align</label>
								<span class="p-buttonset">
										<Button label="" icon="pi pi-align-left" @click="alignText('left')" />
										<Button label="" icon="pi pi-align-center" @click="alignText('center')" />
										<Button label="" icon="pi pi-align-right" @click="alignText('right')" />
										<Button label="" icon="pi pi-align-justify" @click="alignText('justify')" />
								</span>
							</span>
							<span class="p-field">
								<label for="text">Color</label>
								<input type="color" v-model="fontColor"   />
							</span>
							<span class="p-field">
								<label for="text">Style</label>
								<font-picker  :api-key="'AIzaSyA94amz2aeB9v66mvhYBEPVubflbyN6z-k'" :active-font="fontFamily" @change="myFont"></font-picker>
							</span>
							<span class="p-field">
								<label for="text">Outline</label>
								<Checkbox v-model="outline" :binary="true" />
							</span>
							<span class="p-field" v-if="outline">
								<label for="text">Outline color</label>
								<input type="color" v-model="outlineColor"  />
							</span>
						</div>
					</TabPanel>
					<TabPanel header="Image">
						<div>
							<h4 class="widget-title">UPLOAD ART</h4>
							<input type="file" @change="myImage($event)">
							<img :src="setImage" width="100px" />
							<Button v-if="setImage" label="" icon="pi pi-times" class="p-button-rounded p-button-danger rmImg" @click="remImg" />
						</div>
					</TabPanel>
				</TabView>
			</div>
			<div class="p-col canvasContainer">
				<v-stage 	@mousedown="handleStageMouseDown" @touchstart="handleStageMouseDown"
									ref="stage" :config="stageSize">
					<v-layer ref="layer">
						<v-group name="_outer_portal" ref="outer">
							<v-group name="_inner_portal" ref="inner">
								<v-image ref="image" :config="{
									image:printImage,
									rotation: 0,
									scaleX: 1,
									scaleY: 1,
									x:50,
									y:50,
									draggable:true,
									name:'img',						

								}" 
								@transformend="handleTransformEnd"
								@dragstart="handleDragStart"
								@dragend="handleDragEnd" />
								
								<v-text ref="text" :config="{
									x: 50,
									y: 200,
									rotation: 0,
									scaleX: 1,
									scaleY: 1,
									wrap: 'word',
									width:200,
									fontFamily: fontFamily,
									fontSize: fontSize,
									text: textData,
									fill: fontColor,
									shadowEnabled: outline,
									shadowColor:outlineColor,
									align:align,
									shadowOffset:{x:1,y:1},
									draggable: true,
									name:'txt',
								}" 
								@transformend="handleTransformEnd"
								@dragstart="handleDragStart"
								@dragend="handleDragEnd" />
								<v-transformer ref="transformer" />
							</v-group>
						</v-group>
						
						<v-image ref="image" @dblclick="dragOn"   :config="{
							image: image
						}"/>
					</v-layer>
					<v-layer ref="topLayer" name='top-layer'></v-layer>
				</v-stage>
			</div>
		</div>
	</div>
</template>
<script>

import './Mobile.scss';
import m_texture from  './../m_texture.png';
const width = window.innerWidth;
const height = window.innerHeight;
export default {
  name: 'Mobile',
  data() {
    return {
			textData:'',
			fontSize:24,
			fontColor:'#000000',
			fontFamily:'Calibri',
			outline:false,
			outlineColor:'#ffffff',
			printImage:null,
			align:'left',
			stageSize: {
        width: width,
        height: height
      },
      image: null,
			setImage:null,
			selectedShapeName: '',
			isDragging:false,
    };
  },
	methods: {
		handleTransformEnd(e) {
      // shape is transformed, let us save new attrs back to the node
      // find element in our state
      const rect = e.target;
			// update the state
			if(e.target.name == 'txt' || e.target.name == 'img'){
				rect.x = e.target.x();
				rect.y = e.target.y();
				rect.rotation = e.target.rotation();
				rect.scaleX = e.target.scaleX();
				rect.scaleY = e.target.scaleY();

				// change fill
				rect.fill = 'green';

			}
    },
    handleStageMouseDown(e) {
		
			const stage = this.$refs['outer'].getNode().getStage();
			const newContainer = stage.findOne('.top-layer');
			if (this.isDragging && newContainer) {		
				console.log('true');
				this.$refs['inner'].getNode().moveTo(newContainer);
			} else {
				this.$refs['inner'].getNode().moveTo(this.$refs['outer'].getNode());
			}
			// manually redraw layers
			this.$refs['outer'].getNode().getLayer().batchDraw();
			if (newContainer) {
				newContainer.getLayer().batchDraw();
			}

			
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = '';
        this.updateTransformer();
        return;
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === 'Transformer';
      if (clickedOnTransformer) {
        return;
      }

      // find clicked rect by its name
      const name = e.target.name();
      if (name == 'txt' || name == 'img') {
        this.selectedShapeName = name;
      } else {
        this.selectedShapeName = '';
      }
      this.updateTransformer();
    },
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode();
      const stage = transformerNode.getStage();
			const { selectedShapeName } = this;
      const selectedNode = stage.findOne('.' + selectedShapeName);
      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return;
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode]);
      } else {
        // remove transformer
        transformerNode.nodes([]);
      }
      transformerNode.getLayer().batchDraw();
    },
		myFont: function(e){
			this.fontFamily = e.family;
		},
		myImage: function(e){
			this.setImage = null;
			this.printImage = null;
			const printimage = new window.Image();
			this.setImage = URL.createObjectURL(e.target.files[0]);
			printimage.src = URL.createObjectURL(e.target.files[0]);
			printimage.width = '200';
			printimage.height = '200';
			this.printImage = printimage;
		},
		handleDragStart: function(){
			this.isDragging = true;
		},
		handleDragEnd: function(){
			this.isDragging = false;
		},
		dragOn: function(){
			this.isDragging = true;
		},
		colorPick: function(e){
			console.log(e)
		},
		alignText: function(e){
			this.align = e;
		},
		remImg:function(){
			this.printImage = null;
			this.setImage = null;
		},
  },
	created() {
    const image = new window.Image();
    image.src = m_texture;
    image.onload = () => {
      // set image only when it is loaded
      this.image = image;
    };
  }
}
</script>


<style>

.canvasContainer{
  width:'265px';height:'550px';float:'left'
}
.canvasContainer > div{
  width:265px;height:550px; overflow: hidden;
}
</style>