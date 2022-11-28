import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'

const App = () => {

  const [data, setData] = useState([])
  const [name,setName]=useState();
  const [temp,settemp]=useState();

  // htmlfor="form1"

  const getData = async () => {
    const response = await Axios.get('http://localhost:9000/')
    setData(response.data.list)
  }

  useEffect(() => {
    getData()
  }, [getData])

  const add = async () => {
    const result = await Axios.post('http://localhost:9000/', { text: name , undo: true});
  }

  const del = async (id) => {
    await Axios.delete(`http://localhost:9000/${id}`);
  }  

  const status = async (item) => {
    await Axios.put(`http://localhost:9000/${item._id}`, {text: item.text, undo: !item.undo})
  }

  const edit = async (item) => {
    const newName = prompt('Enter a task here')
    if(newName !== "")
      await Axios.put(`http://localhost:9000/${item._id}`, { text: newName , undo: item.undo})
  }
  return (
    <>
      <section className="vh-100" mystyle="background-color: #eee;">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">

                  <h4 className="text-center my-3 pb-3">To Do App</h4>

                  <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                    <div className="col-12">
                      <div className="form-outline">
                        <input type="text" id="form1" className="form-control" onKeyUp={(e)=>setName(e.target.value)} />
                        <label className="form-label" >Enter a task here</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" onClick={add} className="btn btn-primary mb-4">Save</button>
                    </div>

                  </form>

                  <table className="table mb-4">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Todo item</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.text}</td>
                          <td>
                            <button type="submit" onClick={() => status(item)} className="btn">{item.undo?"Undone":"Done"}</button>
                          </td>
                          <td>
                            <button type="submit" onClick={() => del(item._id)} className="btn btn-danger">Delete</button>
                            <button type="submit" onClick={() => edit(item)} className="btn btn-success ms-1">Edit</button>
                          </td>
                        </tr>
                        )}
                    </tbody>
                  </table>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default App