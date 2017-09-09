export const Categories = [
    "Mobiles",
    "Labtops",
    "Tablets"
]
interface ProductModel {
    uid: String,
    Title: String,
    Description: String,
    AutionEndDate: String,
    AutionEndTime: String,
    AutionEndTimeStamp: Number,
    BidStartingAmount: Number,
    MinimumBidAmount: Number,
    Category: String,
    AuctionAwardedToAmount: Number,
}

export default ProductModel;