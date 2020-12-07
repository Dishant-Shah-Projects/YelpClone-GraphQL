import { gql } from "apollo-boost";

const signupMutation = gql`
  mutation($FirstName: String, $LastName: String, $UserName: String, $Password: String, $Role: String, $Location: String) {
    signup(FirstName: $FirstName, LastName: $LastName, UserName: $UserName, Password: $Password,Location: $Location,Role:$Role) {
      Result
      Token
    }
  }
`;
const loginMutation = gql`
  mutation($UserName: String, $Password: String, $Role: String) {
    login(UserName: $UserName, Password: $Password, Role: $Role) {
      Result
      Token
      Token2
      Status
    }
  }
`;

const profileUpdateMutation = gql`
  mutation($City: String,$State: String, $Country: String, $Nickname: String, $customerID: String, $Email: String,$PhoneNo: Int, $Headline: String, $DOB:String) {
    customerprofileupdate(City: $City, State: $State, Country: $Country, Nickname: $Nickname, customerID: $customerID, Email: $Email, PhoneNo: $PhoneNo, Headline: $Headline,DOB: $DOB) {
      Result
    }
  }
`;
const profileUpdate2Mutation = gql`
  mutation($AboutMe: String,$ThingsILove: String, $Findme: String,$customerID: String,) {
    customerprofileupdate(AboutMe: $AboutMe, ThingsILove: $ThingsILove, Findme: $Findme, customerID: $customerID ) {
      Result
    }
  }
`;
const restaurantSearchMutation = gql`
  mutation($AboutMe: String,$ThingsILove: String, $Findme: String,$customerID: String,) {
    customerprofileupdate(AboutMe: $AboutMe, ThingsILove: $ThingsILove, Findme: $Findme, customerID: $customerID ) {
      Result
    }
  }
`;
const ratingAddMutation = gql`
  mutation($Review: String,$Rating: String, $customerID: String,$restaurantID: String) {
    restaurantRating(Review: $Review, Rating: $Rating, customerID: $customerID, restaurantID: $restaurantID ) {
      Result
    }
  }
`;
const restaurantOrderMutation = gql`
  mutation($restaurantID: String,$customerID: String, $OrderType: String,$Items: String) {
    restaurantOrder(restaurantID: $restaurantID, customerID: $customerID, OrderType: $OrderType, Items: $Items ) {
      Result
    }
  }
`;


export { signupMutation, loginMutation,profileUpdateMutation ,profileUpdate2Mutation,ratingAddMutation,restaurantOrderMutation};
