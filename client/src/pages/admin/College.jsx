import { useState, useEffect } from 'react'
import axios from 'axios'
import "./admin.css";

const College = () => {
  const [data, setData] = useState({
    name:'',
    description:''
  })
const [mode, setEditMode] = useState(null)
const [editId , setEditId] = useState(null)
const [college , setCollege] = useState([])

const handleChange = (e) =>{
  setData(()=>({...data,[e.target.name]:e.target.value}))
}
const handleSubmit = async (e) =>{
  e.preventDefault()
  try{
     if(mode){
       const res = await axios.put(`http://localhost:5000/api/college/${editId}`,data)
       alert(res.data.msg)
       setEditMode(false)
       setData({
         name:'',
         description:''
       })
       await handlefetch();
     } else {
       const res = await axios.post('http://localhost:5000/api/college/register',data)
       alert(res.data.msg || 'College registered')
       setData({
         name:'',
         description:''
       })
       await handlefetch();
     }
  }catch(er){
     console.log(er)
     window.alert('sorry try again')
  }
}
console.log(data)

//fetch data
const handlefetch = async()=>{
  try{
    const res = await axios.get('http://localhost:5000/api/college/show')
    const colleges = res.data.colleges || res.data.College || res.data.college || []
    setCollege(colleges)
  }catch(er){
    console.log(er);
  }
}
useEffect(()=>{
  handlefetch();
},[])

const handleEdit =(a)=>{
  console.log(a);
  setData({
    name:a.name,
    description:a.description
  })
  setEditMode(true)
  setEditId(a._id);
}
console.log(data);

const handleDelete = async(a)=>{
  const res = await axios.delete(`http://localhost:5000/api/college/${a}`)
  alert(res.data.msg)   
  handlefetch(); 
}
    return ( 
        <>
        <div className="container-fluid">
                <div className="row text-center mx-0 " style={{justifyContent:'center'}}>
                    <div className="col-md-6 text-center mx-0" style={{justifyContent:'center', height:'450px', width:'900px'}}>
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-primary"><b>Add New College</b></h2>
                                <br />
                                <form method='POST' onSubmit={handleSubmit}>
                                <h6 className="card-text text-start ms-4">College Name</h6>
                                <input
                                    className="form-control"
                                    
                                    
                                    list="datalistOptions"
                                    id="exampleDataList"
                                    placeholder="Enter College Name"
                                    value={data.name}
                                    name='name'
                                    onChange={handleChange}
                                />
                                <datalist id="datalistOptions">
                                    <option value="GLI Agra" />
                                    <option value="Government Girls Plytechnic, Ballia" />
                                    <option value="GGPL Gorakhpur" />
                                    <option value="GGPL Gorakhpur" />
                                    <option value="GGPL Gorakhpur" />
                                </datalist>
                                
                                <h6 className="card-text text-start ms-4">Description</h6>
                                <textarea className="form-control" placeholder='Enter college description'
                                id=''
                                name='description'
                                value={data.description}
                                onChange={handleChange}>
                               
                                </textarea>

                                <button type="submit" className="save-college-btn mt-4">Save College</button>
                                </form>
                            </div>

                        </div>
                    </div>
                    <section className="registered-colleges my-4">
            <h3>Registered Colleges</h3>

            <div className="table-controls">
              <div className="entries-control">
                <select defaultValue="10">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
                <span>entries per page</span>
              </div>

              <input type="search" placeholder="Search records..." />
            </div>

            <div className="table-responsive">
              <table className="college-table">
                <thead>
                  <tr>
                    <th>S NO.</th>
                    <th>COLLEGE</th>
                    <th>DESCRIPTION</th>
                    <th>CREATED BY</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                        <tbody>
                          {college.map((item, i) => (
                            <tr key={item._id || i}>
                              <td>{i + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.description}</td>
                              <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}</td>
                              <td>
                                <button className='btn btn-danger' style={{height:'40px', width:'100px', borderRadius:'20px'}} onClick={() => {handleDelete(item._id)}}>Delete</button>
                                <button className="btn btn-success" style={{height:'40px', width:'100px', borderRadius:'20px'}} onClick={() => {handleEdit(item)}}>
                                  <i className="bi bi-trash-fill"></i>
                                  Edit
                                </button>
                              </td>
                            </tr>
                           ))}
                        </tbody>
              </table>
            </div>
          </section>
                </div>
            </div>
            
        </>
    )
}

export default College