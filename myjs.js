
var inputs = window.inputs;

var graph = new joint.dia.Graph;
var keyboard = new joint.ui.Keyboard();
var paper = new joint.dia.Paper({
	el:$('.krunal'),
	width:2000,
	height:250,
	model:graph,
	gridSize: 1
}).on({
	'element:pointerdown': function(cellView, evt) {

        // Select an element if CTRL/Meta key is pressed while the element is clicked.
        
        	selection.collection.add(cellView.model);
        
    },
    'element:pointerup': openTools,
});

var rect = new joint.shapes.basic.Rect({
    position: { x: 100, y: 30 },
    size: { width: 100, height: 30 },
    attrs: { rect: { ill: 'blue' }, text: { text: 'my box', fill: 'white' } }
});

var rect2 = rect.clone();
rect2.translate(300);

var link = new joint.dia.Link({
    source: { id: rect.id },
    target: { id: rect2.id }
});

graph.addCells([rect,rect2,link]);

rect.on('change:position',function(element){
	//console.log(element.id,":",element.get('position'));
})

var selection = new joint.ui.Selection({
	paper:paper,
	graph:graph,
	
}).on({
	'selection-box:pointerdown':function(cellView,evt){
		console.log("Dwada");
	}
})

var stencil = new joint.ui.Stencil({
	graph:graph,
	paper:paper,
	dragEndClone: function(cell){
		var clone = cell.clone();
		return clone;
	},
	width:2000
})

stencil.render().$el.appendTo('.stencil');

graph.on('add', function(cell, collection, opt) {

    if (!opt.stencil) return;

    // open inspector after a new element dropped from stencil
    var view = paper.findViewByModel(cell);
    if (view) openTools(view);
});
function openTools(cellView) {
	
    var cell = cellView.model;
    var type = cell.get('type');
    return;
    window.inspector = joint.ui.Inspector.create('#inspector-container', {
        cell: cell,
        inputs: inputs[type],
        groups: {
            general: { label: type, index: 1 },
            appearance: { index: 2 }
        }
    });

    if (!cell.isLink() && !selection.collection.contains(cell)) {

        selection.collection.reset([]);
        // Add the cell into the selection collection silently
        // so no selection box is rendered above the cellview.
        selection.collection.add(cell, { silent: true });

        new joint.ui.FreeTransform({
            cellView: cellView,
            allowOrthogonalResize: false,
            allowRotation: false
        }).render();

        var halo = new joint.ui.Halo({
            cellView: cellView,
            theme: 'default',
            boxContent: function(cellView) {
                return cellView.model.get('type');
            }
        });
        halo.render();
        halo.removeHandle('rotate');
        halo.removeHandle('resize');
    }
}
stencil.load([
	new joint.shapes.basic.Rect({
	    position: { x: 100, y: 30 },
	    size: { width: 100, height: 60 },
	    attrs: { rect: { fill: 'blue' } }
	}),
	new joint.shapes.basic.Circle({
		position:{x:10,y:30}
		
	}),
	new joint.shapes.basic.Rect({
		position: {x:240,y:30},
		size: {width : 100,height:30},
		attrs:{rect:{rx:28,ry:28}}
	}) 
])

