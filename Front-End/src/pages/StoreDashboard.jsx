import React from 'react'

const StoreDashboard = () => {
  return (
    <div>
      <h1>WELCOME, </h1>
      <button> ADD STORE </button>
      <div>
        <form>
            <label>Store Name</label> <br />
            <input type='name' name='name' /> <br/>
            <label> Address</label><br/>
            <input type='text' name="address"></input><br/>
        </form>
      </div>

      <div>
        {
            store.map((ele,i)=>(
                <div>
                <h4>{ele.name}</h4>
                <p>{ele.address}</p>
                <p>{ele.rating}</p>
                <button>Edit</button>
                <button>Delete</button>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default StoreDashboard
