<template>
	<div>
		<div class="p-grid">
			<div class="p-col-4"><a href="/">Home</a></div>
		</div>
		<div class="p-grid">
			<div class="p-col-4">
				<TabView>
          <TabPanel header="Bg">
              <h4 className="widget-title">
                Selected Colors
              </h4>
              <div class="c-color-swatch">
                <input type="radio" name="color" id="red" value="red" @click="setBgColor('#DB2828')" />
                <label for="red"><span class="red"></span></label>
                
                <input type="radio" name="color" id="green" @click="setBgColor('#21BA45')"  />
                <label for="green"><span class="green"></span></label>
                
                <input type="radio" name="color" id="yellow" @click="setBgColor('#FBBD08')"  />
                <label for="yellow"><span class="yellow"></span></label>
                
                <input type="radio" name="color" id="olive" @click="setBgColor('#B5CC18')" />
                <label for="olive"><span class="olive"></span></label>
                
                <input type="radio" name="color" id="orange" @click="setBgColor('#F2711C')"  />
                <label for="orange"><span class="orange"></span></label>
                
                <input type="radio" name="color" id="teal" @click="setBgColor('#00B5AD')"  />
                <label for="teal"><span class="teal"></span></label>
                
                <input type="radio" name="color" id="blue" @click="setBgColor('#2185D0')"  />
                <label for="blue"><span class="blue"></span></label>
                
                <input type="radio" name="color" id="violet" @click="setBgColor('#6435C9')"  />
                <label for="violet"><span class="violet"></span></label>
                
                <input type="radio" name="color" id="purple" @click="setBgColor('#A333C8')"  />
                <label for="purple"><span class="purple"></span></label>
                
                <input type="radio" name="color" id="pink" @click="setBgColor('#E03997')"  />
                <label for="pink"><span class="pink"></span></label>
              </div>
          </TabPanel>
					<TabPanel header="Text">
						<div v-if="backSide">
							<h4 class="widget-title" >
								Add New Text
							</h4>
							<span class="p-field">
								<label for="text">Type here</label>
								<InputText id="text" type="text" v-model="textDataB" />
							</span>
							<span class="p-field">
								<label for="text">Text Size</label>
								<InputText v-model.number="fontSizeB" />
								<Slider v-model="fontSizeB" />
							</span>		
							<span class="p-field">
								<label for="text">Text Align</label>					
								<span class="p-buttonset">
										<Button label="" icon="pi pi-align-left" @click="alignTextB('left')"></Button>
										<Button label="" icon="pi pi-align-center" @click="alignTextB('center')" />
										<Button label="" icon="pi pi-align-right" @click="alignTextB('right')" />
										<Button label="" icon="pi pi-align-justify" @click="alignTextB('justify')" />
								</span>
							</span>
							<span class="p-field">
								<label for="text">Color</label>
								<input type="color" v-model="fontColorB"   />
							</span>
							<span class="p-field">
								<label for="text">Style</label>
								<font-picker  :api-key="'AIzaSyA94amz2aeB9v66mvhYBEPVubflbyN6z-k'" :active-font="fontFamilyB" @change="myFontB"></font-picker>
							</span>
							<span class="p-field">
								<label for="text">Outline</label>
								<Checkbox v-model="outlineB" :binary="true" />
							</span>
							<span class="p-field" v-if="outline">
								<label for="text">Outline color</label>
								<input type="color" v-model="outlineColorB"  />
							</span>
						</div>
						<div v-if="frontSide">
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
							</span><span class="p-field">
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
					<TabPanel header="Image" >
						<div v-if="backSide">
							<h4 class="widget-title">UPLOAD ART</h4>
							<input type="file" @change="myImageB($event)">
							<img :src="setImageB" width="100px" />
							<Button v-if="setImageB" label="" icon="pi pi-times" class="p-button-rounded p-button-danger rmImg" @click="remImgB" />
						</div>
						<div v-if="frontSide">
							<h4 class="widget-title">UPLOAD ART</h4>
							<input type="file" @change="myImage($event)">
							<img :src="setImage" width="100px" />
							<Button v-if="setImage" label="" icon="pi pi-times" class="p-button-rounded p-button-danger rmImg" @click="remImg" />
						</div>
					</TabPanel>
				</TabView>
			</div>
			<div class="p-col canvasContainer" v-if="backSide">        
				<Button label="Front Side" @click="showFront"  />
				<v-stage 	@mousedown="handleStageMouseDown" @touchstart="handleStageMouseDown"
									ref="stage" :config="stageSize">
					<v-layer ref="layer">          
						
                <v-image ref="image"    :config="{
                  image: imageBack,
                  fill: bgColor,
                  width:500,
                  height:500
                }"/>
								<v-image v-if="printImageB" ref="image" :config="{
									image:printImageB,
									rotation: 0,
									scaleX: 1,
									scaleY: 1,
									x:120,
									y:80,
									width:200,
									height:200,
									draggable:true,
									dragBoundFunc:dragBound,
									name:'imgB',						

								}" 
								@transformend="handleTransformEnd"
								@dragstart="handleDragStart"
								@dragend="handleDragEnd" />
								
								<v-text v-if="textDataB" ref="text" :config="{
									x: 130,
									y: 200,
									rotation: 0,
									scaleX: 1,
									scaleY: 1,
									fontFamily: fontFamilyB,
									fontSize: fontSizeB,
									text: textDataB,
									wrap: 'word',
									width:200,
									fill: fontColorB,
									shadowEnabled: outlineB,
									shadowColor:outlineColorB,
									shadowOffset:{x:1,y:1},
									draggable: true,
									align:alignB,
									dragBoundFunc:dragBoundtxt,
									name:'txtB',
								}" 
								@transformend="handleTransformEndTxt"
								@dragstart="handleDragStart"
								@dragend="handleDragEnd" />
								<v-transformer ref="transformer" />
					</v-layer>
				</v-stage>
			</div>
			<div class="p-col canvasContainer" v-if="frontSide">        
				<Button label="Back Side" @click="showBack"  />
				<v-stage 	@mousedown="handleStageMouseDown" @touchstart="handleStageMouseDown"
									ref="stage" :config="stageSize">
					<v-layer ref="layer">          						
                <v-image ref="image"    :config="{
                  image: image,
                  fill: bgColor,
                  width:500,
                  height:500
                }"/>
								<v-image v-if="printImage" ref="image" :config="{
									image:printImage,
									rotation: 0,
									scaleX: 1,
									scaleY: 1,
									x:120,
									y:80,
									width:200,
									height:200,
									draggable:true,
									dragBoundFunc:dragBound,
									name:'img',						

								}" 
								@transformend="handleTransformEnd"
								@dragstart="handleDragStart"
								@dragend="handleDragEnd" />
								
								<v-text v-if="textData" ref="text" :config="{
									x: 130,
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
									dragBoundFunc:dragBoundtxt,
									name:'txt',
								}" 
								@transformend="handleTransformEndTxt"
								@dragstart="handleDragStart"
								@dragend="handleDragEnd" />
								<v-transformer ref="transformer" />
					</v-layer>
				</v-stage>
			</div>
		</div>
	</div>
</template>
<script>
import './Tshir.scss';
import f_texture from  './../f_texture.png';
import b_texture from  './../b_texture.png';
const width = window.innerWidth;
const height = window.innerHeight;
export default {
  name: 'Mobile',
  data() {
    return {
      bgColor: '#FFFFFF',
			textData:'',
			fontSize:24,
			fontColor:'#000000',
			fontFamily:'Calibri',
			outline:false,
			outlineColor:'#ffffff',
			printImage:null,
			bgColorB: '#FFFFFF',
			textDataB:'',
			fontSizeB:24,
			fontColorB:'#000000',
			fontFamilyB:'Calibri',
			outlineB:false,
			outlineColorB:'#ffffff',
			align:'left',
			alignB:'left',
			printImageB:null,
			stageSize: {
        width: width,
        height: height
      },
			image: null,
			imageBack:null,
			setImage:null,
			setImageB:null,
			selectedShapeName: '',
			isDragging:false,
			frontSide:true,
			backSide:false,
    };
  },
	methods: {
		handleTransformEnd(e) {
      // shape is transformed, let us save new attrs back to the node
      // find element in our state
      const rect = e.target.attrs;
			// update the state
			if(rect.name == 'txt' || rect.name == 'img'|| rect.name == 'imgB'|| rect.name == 'txtB'){
				
				if(rect.scaleX > 1){					
					console.log(rect)
					rect.x = 100;
					rect.y = 250;
					rect.rotation = e.target.rotation();
					rect.scaleX = 1;
					rect.scaleY = 1;
					
				}else{
					rect.x = e.target.x();
					rect.y = e.target.y();
					rect.rotation = e.target.rotation();
					rect.scaleX = e.target.scaleX();
					rect.scaleY = e.target.scaleY();
				}

			}
		},
		handleTransformEndTxt(e) {
      // shape is transformed, let us save new attrs back to the node
      // find element in our state
      const rect = e.target.attrs;
			// update the state
			if(rect.name == 'txt' || rect.name == 'img'|| rect.name == 'imgB'|| rect.name == 'txtB'){
				
				if(rect.scaleX > 1){					
					console.log(rect)
					rect.x = 100;
					rect.y = 250;
					rect.width = 100;
					rect.rotation = e.target.rotation();
					rect.scaleX = 1.5;
					rect.scaleY = 1.5;
					
				}else{
					rect.width = 200;
					rect.x = e.target.x();
					rect.y = e.target.y();
					rect.rotation = e.target.rotation();
					rect.scaleX = e.target.scaleX();
					rect.scaleY = e.target.scaleY();
				}

			}
    },
    handleStageMouseDown(e) {			
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
      if (name == 'txt' || name == 'img' || name == 'imgB' || name == 'txtB') {
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
		myFontB: function(e){
			this.fontFamilyB = e.family;
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
		myImageB: function(e){
			this.setImageB = null;
			this.printImageB = null;
			const printimageB = new window.Image();
			this.setImageB = URL.createObjectURL(e.target.files[0]);
			printimageB.src = URL.createObjectURL(e.target.files[0]);
			printimageB.width = '200';
			printimageB.height = '200';
			this.printImageB = printimageB;
		},
		handleDragStart: function(){
			this.isDragging = true;
		},
		handleDragEnd: function(){
			this.isDragging = false;
		},
		colorPick: function(e){
			console.log(e)
    },
    setBgColor: function(color){
      this.bgColor = color;
    },
		showFront: function(){
			this.frontSide = true
      this.backSide = false;
      const image = new window.Image();
      image.src = f_texture;
      image.onload = () => {
        // set image only when it is loaded
        this.image = image;
      };
		},
		showBack: function(){
			this.backSide = true;
      this.frontSide= false;
      
		},
		dragBound: function(pos){
			var x = 150;
			var y = 170;
			var yradius = 40;
			var xradius = 10;
			var xscale =
				xradius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
			var yscale =
				yradius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
			if (xscale < 1)
				return {
					y: Math.round((pos.y - y) * yscale + y),
					x: Math.round((pos.x - x) * xscale + x),
				};
			else return pos;
		},
		dragBoundtxt: function(pos){
			var x = 160;
			var y = 250;
			var yradius = 120;
			var xradius = 30;
			var xscale =
				xradius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
			var yscale =
				yradius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
			if (xscale < 1 || yscale < 1)
				return {
					y: Math.round((pos.y - y) * yscale + y),
					x: Math.round((pos.x - x) * xscale + x),
				};
			else return pos;
		},
		alignTextB: function(e){
			this.alignB = e;
		},
		alignText: function(e){
			this.align = e;
		},
		remImg:function(){
			this.printImage = null;
			this.setImage = null;
		},
		remImgB:function(){
			this.printImageB = null;
			this.setImageB = null;
		}
  },
	created() {
    const image = new window.Image();
    image.src = f_texture;
    image.onload = () => {
      // set image only when it is loaded
      this.image = image;
		};
		const imageBack = new window.Image();
		imageBack.src = b_texture;
		imageBack.onload = () => {
			// set image only when it is loaded
			this.imageBack = imageBack;
		};
  }
}
</script>
