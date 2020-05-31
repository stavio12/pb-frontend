import React from 'react'

import '../App.css'
import { useStore } from 'react-redux'

function NavbarContainer (props){
  let store = useStore()

    function handleOnClick(){
        this.props.endSession()
    }
    function renderif(){
      let user = store.getState()
    
        if (props.loggedIn){
            return(
      <div >
         <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                 <a class="navbar-brand navbar" href="/">Pb</a>
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                 <span class="navbar-toggler-icon"></span>
               </button>
     <div class="collapse navbar-collapse" id="navbarNav">
       <ul class="navbar-nav">
         <li class="nav-item active">
           <a class="nav-link" onClick={(e)=>handleActivation(e)} href="/">Home</a>
         </li>
          <li class="nav-item">
           <a class="nav-link"  onClick={()=>handleActivation()} href={`/users/${user.users.currentUser.id}`}>Profile</a>
          </li>
          <li class="nav-item">
           <a class="nav-link"  onClick={()=>handleActivation()} href={`/users/${user.users.currentUser.id}/inbox`}>Inbox</a>
          </li>
          <li class="nav-item">
            <a class="nav-link"  onClick={()=>handleOnClick()} href="/">Log Out</a>
          </li>
      </ul>
      
    </div>
        </nav>
      </div>)
        }else{
            return(
        <div >
          <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
          <a class="navbar-brand navbar" href="/">Pb</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
    <div class="collapse navbar-collapse" id="navbarNav">
       <ul class="navbar-nav">
           <li class="nav-item active">
              <a class="nav-link" onClick={(e)=>handleActivation(e)} href="/">Home</a>
           </li>
            <li class="nav-item">
              <a class="nav-link" onClick={(e)=>handleActivation(e)} href="/">Sign In</a>
            </li>
        </ul>
      
          </div>
        </nav>
    </div>
        )
            
           
        }
    }
    

  
   function handleActivation(e){
      e.preventDefault()
     let items=  document.querySelectorAll(".nav-item")
     
      Array.from(items).map(x=>{
        
        if(x.classList.contains("active")){

          x.classList.remove("active")
        }
      })
        e.target.classList.add("active")
       
   }
    
        return(
    
            <div >
          
      {renderif()}
    
            </div>
        )
    }

export default NavbarContainer