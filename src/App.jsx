import { useEffect, useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import { calcularTotalaPagar, formatearDinero } from "./helpers";

calcularTotalaPagar


function App() {

  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0); // Este calculo saldra de la cantidad y el plazo a pagar (meses)
  const [pago, setPago] = useState(0)
  
  
  useEffect(() => {
    const resultadoTotalPagar = calcularTotalaPagar(cantidad, meses) // Ver la funcion en helpers
    setTotal(resultadoTotalPagar);

}, [cantidad, meses]);
  
useEffect(() => {
   //calculamos el pago mensual
  setPago( total/meses )
}, [ total]);
  

  const min = 0;
  const max = 20000;
  const step = 100

  const handleMeses = (e) => {
    setMeses(parseInt(e.target.value))
    console.log(parseInt(e.target.value))
  }
  
  const handleChange = (e) => {
    
    setCantidad(parseInt(e.target.value))

  };

  const handleClickDecrement = () => {
    const valor = cantidad - step; //Decremento el valor de catnidad de 100 en 100 (valor de step)
    if (valor < min) {
      alert(`La Cantidad no puede ser menor a ${min}`);

      return
    }
    
    setCantidad(valor) //le seteo el valor de "valor" a la cantidad

  };
  const handleClickIncrement = () => {
    const valor = cantidad + step; //Decremento el valor de catnidad de 100 en 100 (valor de step)
    if (valor > max) {
      alert(`La Cantidad no puede ser mayor a ${max}`);
      return
    }
    
    setCantidad(valor) //le seteo el valor de "valor" a la cantidad

  };
 
 
  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10" >
       <Header/>

       <div className='flex justify-between my-6' >
         <Button 
            operador='-'
            fn={handleClickDecrement}
         />
         <Button
          operador='+'
          fn={handleClickIncrement}
         />
       </div>

       <input 
          type='range'
          className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-400"
          onChange={ handleChange }
          min={min}
          max={max}
          step={step}
          value={cantidad}

       />
      <p className="text-center my-10 text-5xl font-extrabold text-indigo-600 " > {formatearDinero(cantidad)} </p>

      <h2 className='text 2xl font-extrabold text-gray-500 text-center' >
          Elige un <span className='text-indigo-600' >Plazo</span> a Pagar
      </h2>

      <select
          className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold '
          value={meses}
          onChange={handleMeses}
      >
          <option value='6'> 6 Meses</option>
          <option value='12'> 12 Meses</option>
          <option value='24'> 24 Meses</option>
      </select>

      <div className='my-5 space-y-3 bg-gray-50 p-5 ' >
      <h2 className='text 2xl font-extrabold text-gray-500 text-center' >
         Resumen <span className='text-indigo-600' >de pagos</span>
      </h2>

      <p className='text-xl text-gray-500 text-center font-bold ' > {meses} Meses</p>
      <p className='text-xl text-gray-500 text-center font-bold ' > {formatearDinero(total)} Total a pagar</p>
      <p className='text-xl text-gray-500 text-center font-bold ' > {formatearDinero(pago)} Pagos mensuales</p>

      </div>


    </div>
    
  )
}

export default App
