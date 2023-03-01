import Layout from './Layout.svelte'
import Login from './views/session/Login.svelte'
import Signup from './views/session/Signup.svelte'
import Forgot from './views/session/Forgot.svelte'
import ResetPassword from './views/session/ResetPassword.svelte'
import Test from './views/Test.svelte'
import Account from './views/Account.svelte'
import Offerings from './views/Offerings.svelte'
import MyAssets from './views/MyAssets.svelte'
import AddProperty from './views/AddProperty.svelte'
import Buy from './views/Buy.svelte'
import Portfolio from './views/Portfolio.svelte'
import LoadWallet from './views/LoadWallet.svelte'
import EditProperty from './views/EditProperty.svelte'
import Trade from './views/Trade.svelte'
import Admin from './views/Admin.svelte'
import Welcome from './views/Welcome.svelte'

function userIsAdmin() {
  //check if user is admin and return true or false
}

const routes = [
  {
    name: '/',
    component: Welcome,
    layout: Layout,
  }, {
    name: 'login',
    component: Login,
    layout: Layout,
  }, {
    name: 'signup',
    component: Signup,
    layout: Layout,
  }, {
    name: 'forgot',
    component: Forgot,
    layout: Layout,
  }, {
    name: 'account',
    component: Account,
    layout: Layout,
  }, {
    name: 'resetPassword',
    component: ResetPassword,
    layout: Layout,
  }, {
    name: 'test',
    component: Test,
    layout: Layout,
  }, {
    name: 'offerings',
    component: Offerings,
    layout: Layout,
  }, {
    name: 'myassets',
    component: MyAssets,
    layout: Layout,
  }, {
    name: 'addproperty',
    component: AddProperty,
    layout: Layout,
  }, {
    name: 'buy/:symbol',
    component: Buy,
    layout: Layout,
  }, {
    name: 'editProperty/:symbol',
    component: EditProperty,
    layout: Layout,
  }, {
    name: 'trade',
    component: Trade,
    layout: Layout,
  }, {
    name: 'loadWallet',
    component: LoadWallet,
    layout: Layout,
  }, {
    name: 'portfolio',
    component: Portfolio,
    layout: Layout,
  }, {
    name: 'admin',
    component: Admin,
    layout: Layout,
    onlyIf: { guard: userIsAdmin, failure: '/login' },
  },
]

export { routes }