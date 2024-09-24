import React, { useEffect, useState } from "react";

function App() {
  const [firstNum, setFirstNum] = useState('')
  const [secondNum, setSecondNum] = useState('')
  const [result, setResult] = useState(null)
  const [operation, setOperation]= useState('')
  const [operationData, setOperationData] = useState([])


  const addition = ()=>{
    const num1= Number(firstNum)
    const num2 = Number(secondNum)

    if(!isNaN(num1)&&!isNaN(num2)){
      const res = num1 + num2
      setResult(res)
      setOperation("add")
      performOperation(res)
    }else{
      alert('Please enter valid numbers')
    }
  }
  
 

const performOperation = async (res)=>{
  //checking if there is no appropriate data
  if (firstNum === '' || secondNum === '' || operation === '' || result === null) {
    console.error("Invalid data, skipping POST request");
    return; // Stop the function if data is invalid
  }
  const data = {
    first:firstNum,
    second: secondNum,
    operation: operation,
    result: res
  }
  const response = await fetch("http://localhost:5000/calculation",{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'

    },
    body: JSON.stringify(data)
  })

  const responseData = await response.json()
  console.log(responseData)

}


const fetchData = async()=>{
  const res = await fetch("http://localhost:5000/calculation")
  const dat = await res.json()
  console.log("type of data : ", typeof(dat))
  console.log("Data : ", dat)
  // const dd = Object.entries(dat)
  // console.log("type of dd: ", typeof(dd))
  // console.log(dd)
  setOperationData(dat)
 
}

useEffect(()=>{
  fetchData()
},[])
  // function calculation()



  return (
    <div className="App">
      <form style={{margin:"4rem", display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"center"}} onSubmit={performOperation}>
        <label style={{display: "flex", margin:"2rem"}}>First Number</label>
        <input 
              type="text" 
              style={{display: "flex", height:"2rem"}}
              onChange={(e)=> setFirstNum(e.target.value)} 
              value={firstNum}
        />
        <lable style={{display: "flex", margin:"2rem"}}>Second Number</lable>
        <input 
              type="text" 
              style={{display: "flex"}}
              onChange={(e)=> setSecondNum(e.target.value)}
              value={secondNum}
        />
        <button onClick={addition} value={operation} style={{display:"block", margin:"2rem"}}>Add</button>
        {result !== null &&<h1>{result}</h1>}
        {operation !==''&& <h1>{operation} </h1>}
      </form>
      <div>
        <table>
          <tr>
            <th>First Input</th>
            <th>Second Input</th>
            <th>Result</th>
          </tr>
          <tbody>
          {
            operationData.map((item, index)=>{
              return(
                <tr key={index}>
                  <td>{item.first}</td>
                  <td>{item.second}</td>
                  <td>{item.result}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
