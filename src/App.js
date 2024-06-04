import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    numeroFactura: '',
    nombreCliente: '',
    cedula: '',
    telefono: '',
    correo: '',
    idProducto: '',
    descripcion: '',
    valorUnitario: '',
    cantidad: '',
  });

  const [productos, setProductos] = useState([]);
  const [totales, setTotales] = useState({ subtotal: 0, iva: 0, total: 0 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const agregarProducto = () => {
    const nuevoProducto = {
      idProducto: formData.idProducto,
      descripcion: formData.descripcion,
      valorUnitario: parseFloat(formData.valorUnitario),
      cantidad: parseInt(formData.cantidad),
      subtotal: parseFloat(formData.valorUnitario) * parseInt(formData.cantidad),
    };

    const nuevosProductos = [...productos, nuevoProducto];
    setProductos(nuevosProductos);
    calcularTotales(nuevosProductos);
  };

  const eliminarProducto = (index) => {
    const nuevosProductos = productos.filter((_, i) => i !== index);
    setProductos(nuevosProductos);
    calcularTotales(nuevosProductos);
  };

  const calcularTotales = (productos) => {
    const subtotal = productos.reduce((sum, prod) => sum + prod.subtotal, 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    setTotales({ subtotal, iva, total });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Factura</h1>
      <div className="grid grid-cols-2 gap-4">
        <input type="text" name="numeroFactura" placeholder="Número de Factura" value={formData.numeroFactura} onChange={handleChange} className="p-2 border" />
        <input type="text" name="nombreCliente" placeholder="Nombre del Cliente" value={formData.nombreCliente} onChange={handleChange} className="p-2 border" />
        <input type="text" name="cedula" placeholder="Cédula" value={formData.cedula} onChange={handleChange} className="p-2 border" />
        <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} className="p-2 border" />
        <input type="email" name="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} className="p-2 border col-span-2" />
        <input type="text" name="idProducto" placeholder="ID Producto" value={formData.idProducto} onChange={handleChange} className="p-2 border" />
        <input type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} className="p-2 border" />
        <input type="number" name="valorUnitario" placeholder="Valor Unitario" value={formData.valorUnitario} onChange={handleChange} className="p-2 border" />
        <input type="number" name="cantidad" placeholder="Cantidad" value={formData.cantidad} onChange={handleChange} className="p-2 border" />
        <button onClick={agregarProducto} className="bg-green-500 text-white p-2 col-span-2">Agregar Producto</button>
      </div>

      <table className="table-auto w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID Producto</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Valor Unitario</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Subtotal</th>
            <th className="p-2 border">Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td className="p-2 border">{producto.idProducto}</td>
              <td className="p-2 border">{producto.descripcion}</td>
              <td className="p-2 border">{producto.valorUnitario.toFixed(2)}</td>
              <td className="p-2 border">{producto.cantidad}</td>
              <td className="p-2 border">{producto.subtotal.toFixed(2)}</td>
              <td className="p-2 border">
                <button onClick={() => eliminarProducto(index)} className="bg-red-500 text-white p-2">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-right">
        <p>Subtotal: ${totales.subtotal.toFixed(2)}</p>
        <p>IVA (16%): ${totales.iva.toFixed(2)}</p>
        <p>Total: ${totales.total.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default App;
