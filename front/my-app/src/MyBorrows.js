
import React from 'react'
import Book from './Book'
import './MyBorrows.scss'
import axios from 'axios';

export default function MyBorrows() {
const [myBorrows, setMyBorrows] = React.useState([]);

React.useEffect(() => {
    fetchMyBorrows();
}, [])

const fetchMyBorrows = () =>{
    axios.get('/borrows').then(
        (response => setMyBorrows(response.data))
    )
}
const closeBorrow = (borrowId) => {
    console.log(borrowId);
    axios.delete(`/borrows/${borrowId}`).then(
        (response => fetchMyBorrows())
    )
}

return (
    <div className="container">
        <h1>Mes emprunts</h1>
        <div className="list-container">
            {myBorrows.map((borrow,key) => {
                return (
                    <div className="borrow-container" key={key}>
                        <Book
                            title={borrow.book.title}
                            category={borrow.book.category.label}
                            lender={borrow.lender.firstName + " " + borrow.lender.lastName}
                            askDate={borrow.askDate}
                            closeDate={borrow.closeDate}>
                        </Book>
                        <div className="text-center">
                            {borrow.closeDate ? "" : <button className="btn btn-primary btn-sm" onClick={() => closeBorrow(borrow.id)}>Clore</button>}
                        </div>
                    </div>
                )
            })}
        </div>
        {myBorrows.length === 0 ? <div>Vous n'avez pas d'emprunt</div> : null}
    </div>
)
}