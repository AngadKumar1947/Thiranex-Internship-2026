const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const listingSchema = new Schema ({
    title: {
    type: String,
    require: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            require: true
        },
        url: {
            type: String,
            default: "https://www.istockphoto.com/photo/sycamore-tree-in-summer-field-at-sunset-england-uk-gm476116580-66350103?utm_source=unsplash&utm_medium=affiliate&utm_campaign=srp_photos_bottom&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Ftree&utm_term=tree%3A%3Aaffiliate-layout-optim%3Ab%3A9dd5ecb1-e2a3-4217-849b-67b74abc2d1d",
            set: (v) => v === "" ? "https://www.istockphoto.com/photo/sycamore-tree-in-summer-field-at-sunset-england-uk-gm476116580-66350103?utm_source=unsplash&utm_medium=affiliate&utm_campaign=srp_photos_bottom&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Ftree&utm_term=tree%3A%3Aaffiliate-layout-optim%3Ab%3A9dd5ecb1-e2a3-4217-849b-67b74abc2d1d" : v,
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
         await Review.deleteMany ({_id : {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;