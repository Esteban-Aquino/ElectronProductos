const { app, BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}

let mainWindow;
let productWindow;
// nombre de la app
app.name = 'App Productos';

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        title: 'Prueba de Electron'
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', () => {
        app.quit();
    });

});

const templateMenu = [{
        label: 'Archivo',
        submenu: [{
            label: 'Salir',
            accelerator: process.platform == 'darwin' ? 'command+S' : 'Ctrl+S',
            click() {
                app.quit();
            }
        }]
    },
    {
        label: 'Editar',
        submenu: [{
                label: 'Nuevo producto',
                accelerator: 'Ctrl+N',
                click() {
                    nuevoProductoVentana();
                }
            },
            {
                label: 'Borrar productos',
                accelerator: 'Ctrl+P'
            }
        ]
    }
];

if (process.platform == 'darwin') {
    templateMenu.unshift({
        label: app.getName()
    });
}

function nuevoProductoVentana() {
    productWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Nuevo Producto'
    });
    productWindow.setMenu(null);
    productWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/product.html'),
        protocol: 'file',
        slashes: true
    }));
    productWindow.on('closed', () => {
        productWindow = null;
    });

}

if (process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'Dev tools',
        submenu: [{
                label: 'Mostrar devtools',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}