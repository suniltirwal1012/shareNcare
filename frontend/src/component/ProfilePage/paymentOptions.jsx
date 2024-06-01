export default function PaymentOptions() {
    return (
        <div className="w-full flex flex-start gap-1 ">
            <div className="h-[60vh] cursor-pointer">
                <img src="./options.png" className="ml-24 h-[60vh]"></img>
            </div>
            <div className="w-full flex flex-col ml-[85px] mt-6">
                <div className="cursor-pointer">
                    <img src="./dropdown.png" className="h-auto w-[70vw]"></img>
                </div>
                <div className="flex justify-around">
                <button class="btn btn-active btn-primary">Pay Now</button>
                </div>
            </div>
        </div>
    )
}