export default function LoadingModal({isLoading}) {
 function handleClick(e) {
        if(e.target === e.currentTarget) {
            setVisible(false);
        }
    }

    return isLoading ? (
        <div onClick={handleClick} className="w-screen h-screen backdrop-blur-[4px] bg-[rgb(0,0,0,0.4)] fixed top-0 left-0 z-[10000] flex items-center justify-center p-2">
           <div className="w-full h-full flex items-center justify-center">
                    <div className="border-10 size-20 rounded-full border-blue-200 border-t-blue-500 animate-spin" />
            </div>
        </div>
    ) : null
}