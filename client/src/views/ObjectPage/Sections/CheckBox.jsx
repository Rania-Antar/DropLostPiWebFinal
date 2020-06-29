import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// plugin that creates slider
import nouislider from 'nouislider'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
// @material-ui icons
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Cached from '@material-ui/icons/Cached'
import Subject from '@material-ui/icons/Subject'
import Check from '@material-ui/icons/Check'
// core components
import Accordion from '../../../components/Accordion/Accordion.jsx'
import GridContainer from '../../../components/Grid/GridContainer.jsx'
import GridItem from '../../../components/Grid/GridItem.jsx'
import Card from '../../../components/Card/Card.jsx'
import CardHeader from '../../../components/Card/CardHeader.jsx'
import CardBody from '../../../components/Card/CardBody.jsx'
import CardFooter from '../../../components/Card/CardFooter.jsx'
import Button from '../../../components/CustomButtons/Button.jsx'
import Clearfix from '../../../components/Clearfix/Clearfix.jsx'

import suit1 from '../../../../src/static/img/examples/suit-1.jpg'
import suit2 from '../../../../src/static/img/examples/suit-2.jpg'
import suit3 from '../../../../src/static/img/examples/suit-3.jpg'
import suit4 from '../../../../src/static/img/examples/suit-4.jpg'
import suit5 from '../../../../src/static/img/examples/suit-5.jpg'
import suit6 from '../../../../src/static/img/examples/suit-6.jpg'
import color1 from '../../../../src/static/img/examples/color1.jpg'
import color3 from '../../../../src/static/img/examples/color3.jpg'
import color2 from '../../../../src/static/img/examples/color2.jpg'
import dg3 from '../../../../src/static/img/dg3.jpg'
import dg1 from '../../../../src/static/img/dg1.jpg'

import styles from '../../../jss/material-kit-pro-react/views/ecommerceSections/productsStyle.jsx'
import Axios from 'axios'
import ImageSlider from '../Sections/ImageSlider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CategoryIcon from '@material-ui/icons/Category';

const categories = [
    {
        "_id": "Pet",
        "name": "Pet"
    },
    {
        "_id": "Smartphone",
        "name": "Smartphone"
    },
    {
        "_id": "Electronic",
        "name": "Electronic"
    },
    {
        "_id": "Laptop",
        "name": "Laptop"
    },
    {
        "_id": "Card-Document-Money",
        "name": "Card-Document-Money"
    },
    {
        "_id": "Bag",
        "name": "Bag"
    },
    {
        "_id": "Car",
        "name": "Car"
    },
    {
        "_id": "Moto",
        "name": "Moto"
    },
    {
        "_id": "Keys",
        "name": "Keys"
    }
]
const locations = [
    {
        "_id": "Tunis",
        "name": "Tunis"
    },
    {
        "_id": "Ariana",
        "name": "Ariana"
    },
    {
        "_id": "BEN AROUS",
        "name": "BEN AROUS"
    },
    {
        "_id": "BIZERTE",
        "name": "BIZERTE"
    },
    {
        "_id": "NABEUL",
        "name": "NABEUL"
    },
    {
        "_id": "BEJA",
        "name": "BEJA"
    },
    {
        "_id": "KEF",
        "name": "KEF"
    },
    {
        "_id": "SILIANA",
        "name": "SILIANA"
    },
    {
        "_id": "JENDOUBA",
        "name": "JENDOUBA"
    },
    {
        "_id": "ZAGHOUAN",
        "name": "ZAGHOUAN"
    },
    {
        "_id": "SOUSSE",
        "name": "SOUSSE"
    },
    {
        "_id": "MONASTIR",
        "name": "MONASTIR"
    },
    {
        "_id": "MAHDIA",
        "name": "MAHDIA"
    },
    {
        "_id": "KAIROUAN",
        "name": "KAIROUAN"
    },
    {
        "_id": "kasserine",
        "name": "kasserine"
    },
    {
        "_id": "SIDI BOUZID",
        "name": "SIDI BOUZID"
    },
    {
        "_id": "SFAX",
        "name": "SFAX"
    },
    {
        "_id": "GAFSA",
        "name": "GAFSA"
    },
    {
        "_id": "TOZEUR",
        "name": "TOZEUR"
    },
    {
        "_id": "GABES",
        "name": "GABES"
    },
    {
        "_id": "MEDENINE",
        "name": "MEDENINE"
    },
    {
        "_id": "TATAOUINE",
        "name": "TATAOUINE"
    },
    {
        "_id": "KEBILI",
        "name": "KEBILI"
    },
    {
        "_id": "MANOUBA",
        "name": "MANOUBA"
    }
]

class CheckBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            checked: [],
            priceRange: [101, 790],
            objects: [],
            Skip: 0,
            Limit: 6,
            PostSize: 0,
        }
    }


    handleToggle(value) {
        const { checked } = this.state
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        this.setState({
            checked: newChecked,
        })
        this.props.handleFilters(newChecked)
    }
    handleToggleLocation(value) {
        const { checked } = this.state
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        this.setState({
            checked: newChecked,
        })
        this.props.handleFiltersLocation(newChecked)
    }


    render() {

        const renderCheckboxLists = () => categories && categories.map((value, index) => (
            <React.Fragment key={index}>
                <FormControlLabel
                    control={

                        <Checkbox

                            tabIndex={-1}
                            onClick={() => this.handleToggle(value._id)}
                            checked={
                                this.state.checked.indexOf(value._id) !== -1
                                    ? true
                                    : false
                            }
                            checkedIcon={
                                <Check className={classes.checkedIcon} />
                            }
                            icon={
                                <Check
                                    className={classes.uncheckedIcon}
                                />
                            }
                            classes={{
                                checked: classes.checked,
                                root: classes.checkRoot,
                            }}
                        />
                    }
                    classes={{ label: classes.label }}
                    label={value.name}
                />
            </React.Fragment>
  
  ))

  const renderCheckboxListsLocation = () => locations && locations.map((value, index) => (
    <React.Fragment key={index}>
        <FormControlLabel
            control={

                <Checkbox

                    tabIndex={-1}
                    onClick={() => this.handleToggleLocation(value._id)}
                    checked={
                        this.state.checked.indexOf(value._id) !== -1
                            ? true
                            : false
                    }
                    checkedIcon={
                        <Check className={classes.checkedIcon} />
                    }
                    icon={
                        <Check
                            className={classes.uncheckedIcon}
                        />
                    }
                    classes={{
                        checked: classes.checked,
                        root: classes.checkRoot,
                    }}
                />
            }
            classes={{ label: classes.label }}
            label={value.name}
        />
    </React.Fragment>



))

        const { classes } = this.props
        return (
            <div>

                < Accordion
                    active={[0, 2]}
                    activeColor='rose'
                    collapses={
                        [

                            {
                                title: 'Category',
                                content: (
                                    <div className={classes.customExpandPanel}>
                                        <div
                                            className={
                                                classes.checkboxAndRadio +
                                                ' ' +
                                                classes.checkboxAndRadioHorizontal
                                            }
                                        >
                                            {renderCheckboxLists()}


                                        </div>
                                    </div>
                                ),
                            },
                            {
                                title: 'Location',
                                content: (
                                    <div className={classes.customExpandPanel}>
                                        <div
                                            className={
                                                classes.checkboxAndRadio +
                                                ' ' +
                                                classes.checkboxAndRadioHorizontal
                                            }
                                        >
                                            {renderCheckboxListsLocation()}

                                        </div>
                                    </div>
                                ),
                            }
                            
                        ]}
                />
            </div>

        )
    }
}
export default withStyles(styles)(CheckBox)
