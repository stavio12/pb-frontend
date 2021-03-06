import React from 'react'
import "../App.css"
import ProfileCard from "../components/user/ProfileCard"
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import {startPage,myPages,savePage} from "../actions/PageActions"
import {SET_CURRENT_USER,getUsers, END_CURRENT_USER} from '../actions/UserActions'
import NavbarContainer from './NavbarContainer'
import SearchUsers from '../components/user/SearchUsers'
import Pages from "../components/page/pages"
import EditorContainer from './EditorContainer'
import PageBoxes from '../components/page/PageBoxes'
import Editor from "../components/page/editor"
import SearchCardIndex from "../components/user/SearchCardIndex"
import BoxEditor from "../components/page/BoxEditor"
import BookContainer from './BookContainer'
import {getFollowersOfUser,getFollowedUsersOfUser} from "../actions/FollowActions"
import {getBooksOfUser,getAllBooks,startBook} from "../actions/BookActions"
import PageInput from "../components/page/PageInput"
import BookIndex from "../components/book/BookIndex"
import PageCards from "../components/page/PageCards"
import EditBook from "../components/book/EditBook"
class ProfileContainer extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
       const id=  localStorage.getItem("currentUser")
        this.props.getInbox()
        this.props.setCurrentUser()
        this.props.getUsers()   
        this.props.getFollowedUsers(id)
        this.props.getBooksOfUser(id)
   
        
         this.props.getMyPages()
        
    }
    handleOnClick(){
        let title = prompt("Enter a title","untitled")
      
       this.props.startBook(title)
       
    }
    render(){
        let book = this.props.currentUser.home_book
        
        return(
            <div >
                <NavbarContainer loggedIn={this.props.loggedIn} endSession={this.props.endSession} />
                < ProfileCard user={this.props.currentUser} setCurrentUser={this.props.setCurrentUser}/>
                <button onClick={()=>this.handleOnClick()}>Start Book</button>
                <EditBook book={book} />
                <BookIndex books={this.props.booksInView}/>
            </div>
        )
    }

}


function mapDispatchToProps(dispatch){
    return{setCurrentUser: ()=> dispatch(SET_CURRENT_USER()),
    getUsers:()=>getUsers(),
    endSession:()=>END_CURRENT_USER(),
    startPage: (title)=>dispatch(startPage(title)),
    getMyPages: ()=>dispatch(myPages()),
getUsers: ()=>dispatch(getUsers()),
savePage: (data)=>dispatch(savePage(data)),
getAllBooks: ()=>dispatch(getAllBooks()),
getBooksOfUser: (id)=>dispatch(getBooksOfUser(id)),
startBook: (title)=>dispatch(startBook(title)),
getFollowers: (id)=>dispatch(getFollowersOfUser(id)),
    getFollowedUsers: (id)=>dispatch(getFollowedUsersOfUser(id))}
}
function mapStateToProps(state){
    return{
        users: state.users.users,
        currentUser: state.users.currentUser,
        loggedIn: state.users.loggedIn,
        requesting: state.pages.requesting,
        myPages: state.pages.myPages,
        currentBook: state.books.currentBook,
        homeBook: state.users.currentUser.home_book,
        userBooks: state.books.booksOfUser,
        FollowedUsers: state.users.followedUsers
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProfileContainer)