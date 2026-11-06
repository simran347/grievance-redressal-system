import React,{useState,useEffect} from 'react'
import axios from 'axios'
import "./admin.css";

const Discussion = () => {
  return (
    
    <>
    
        <div className="container-fluid">
                <div className="row text-center mx-5">
                    <div className="col-md-6 text-center mx-5">
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
                                    <option value="GGPL Lucknow" />
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
                  {college.map((item,i)=>(

                  <tr>
                    <td>{i+1}</td>
                    <td>{item.name}</td>
                    <td>{item.DESCRIPTION}</td>
                    <td>{item.CREATED}</td>
                    <td>
                      <button className='btn btn-danger'  onClick={()=>{handleDelete(item._id)}} >Delete</button>

                      <button  className="btn btn-success" onClick={()=>{handleEdit(item)}}>
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

export default Discussion