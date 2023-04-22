function OrderFailurePage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams);
    return(
        <h1>Order Failure Page</h1>
    );
}

export default OrderFailurePage;