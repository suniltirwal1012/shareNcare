function Unread() {
    return (
        <div className="h-[65vh] w-full mt-8">
            <div role="alert" className="alert alert-success m-4 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Congratulations! Someone have sucessfully accepted your food to donate.</span>
            </div>
        </div>
    )
}

export default Unread;