Ext.define('Sbi.chart.designer.ChartColumnsContainer', {
    extend: 'Ext.grid.Panel',

	requires: [
        'Ext.grid',
        'Sbi.chart.designer.AxisesContainerStore',
        'Sbi.chart.designer.AxisesContainerModel'
    ],
    
    //width: '100%',
    
    config:{
		minHeight: 200
    },
    
    model: Sbi.chart.designer.AxisesContainerModel,
	    
    columns: [
        {
        	text: 'Nome colonna', 
            dataIndex: 'axisName',
            sortable: true,
            flex: 1
        }
    ],

    enableDragDrop: true,
    
    margin: '0 5 5 0'	
});
