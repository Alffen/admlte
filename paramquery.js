    $(function () {
        function fillOptions(grid) {
            var column = grid.getColumn({ dataIndx: 'ShipCountry' });
            column.filter.options = grid.getData({ dataIndx: ['ShipCountry'] });
            column.filter.cache = null;
            grid.refreshHeader();
        }
        var colM = [
            { title: "ShipCountry", width: 120, dataIndx: "ShipCountry",
                filter: {
                    type: 'select',
                    prepend: { '': 'All Countries' },
                    valueIndx: 'ShipCountry',
                    labelIndx: 'ShipCountry',
                    condition: 'equal',
                    listeners: ['change']
                }
            },
            { title: "Customer Name", width: 130, dataIndx: "ContactName" },
            { title: "Freight", width: 120, format: '$##,###.00',
                summary: {
                    type: "sum"
                },
                dataType: "float", dataIndx: "Freight"
            },
            { title: "Shipping Via", width: 130, dataIndx: "ShipVia" },
		    //{ title: "Shipped Date", width: 100, dataIndx: "ShippedDate", dataType: "date" },
            { title: "Shipping Address", width: 220, dataIndx: "ShipAddress" },
            { title: "Shipping City", width: 130, dataIndx: "ShipCity" }
		];
        var dataModel = {
            location: "remote",
            dataType: "JSON",
            method: "GET",
            url: "/Content/orders.json"
            //url: "/pro/orders/get",//for ASP.NET
            //url: "orders.php",//for PHP
        };
        var groupModel = {
            on: true,
            dataIndx: ['ShipCountry'],
            collapsed: [true],
            title: [
                "{0} ({1})",
                "{0} - {1}"
            ]
        };
        var obj = {
            height: 500,
            toolbar: {
                items: [{
                    type: 'checkbox',
                    label: 'zip',
                    attr: 'id="export_zip"'
                },
                {
                    type: 'select',
                    label: 'Format: ',                
                    attr: 'id="export_format"',
                    options: [{ xlsx: 'Excel', csv: 'Csv', htm: 'Html', json: 'Json'}]
                },
                {
                    type: 'button',
                    label: "Export",
                    icon: 'ui-icon-arrowthickstop-1-s',
                    listener: function () {
                        this.exportData({
                            url: "/pro/demos/exportData",
                            format: $("#export_format").val(),
                            zip: $("#export_zip").prop("checked"),
                            render: true
                        });
                    }
                }]
            },
            dataModel: dataModel,
            scrollModel: { autoFit: true },
            colModel: colM,
            numberCell: { show: false },
            filterModel: { on: true, header: true, type: "local" },
            selectionModel: { type: 'cell' },
            groupModel: groupModel,
            load: function (evt, ui) {
                //options for ShipCountry filter.    
                fillOptions(grid);
            },
            showTitle: false,
            resizable: true,
            virtualX: true,
            virtualY: true,
            hwrap: false,
            wrap: false
        };
        var grid = pq.grid("grid_export", obj);

    });