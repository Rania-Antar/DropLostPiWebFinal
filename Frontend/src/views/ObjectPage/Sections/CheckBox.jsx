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
        "_id": "Pets",
        "name": "Pets"
    },
    {
        "_id": "Electronics",
        "name": "Electronics"
    },
    {
        "_id": "Cards",
        "name": "Cards"
    },
    {
        "_id": "Cars",
        "name": "Cars"
    }
]
const locations = [
    {
        "_id": "Tunis",
        "name": "Pets"
    },
    {
        "_id": "Electronics",
        "name": "Electronics"
    },
    {
        "_id": "Cards",
        "name": "Cards"
    },
    {
        "_id": "Cars",
        "name": "Cars"
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
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(9)}
                                                        checked={
                                                            this.state.checked.indexOf(9) !== -1
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
                                                label='All'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(10)}
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
                                                label='Polo Ralph Lauren'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(11)}
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
                                                label='Wooyoungmi'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(12)}
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
                                                label='Alexander McQueen'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(13)}
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
                                                label='Tom Ford'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(14)}
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
                                                label='AMI'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(15)}
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
                                                label='Berena'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(16)}
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
                                                label='Thom Sweeney'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(17)}
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
                                                label='Burberry Prorsum'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(18)}
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
                                                label='Calvin Klein'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(19)}
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
                                                label='Kingsman'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(20)}
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
                                                label='Club Monaco'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(21)}
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
                                                label='Dolce & Gabbana'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(22)}
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
                                                label='Gucci'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(23)}
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
                                                label='Biglioli'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(24)}
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
                                                label='Lanvin'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(25)}
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
                                                label='Loro Piana'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(26)}
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
                                                label='Massimo Alba'
                                            />
                                        </div>
                                    </div>
                                ),
                            },
                            {
                                title: 'Colour',
                                content: (
                                    <div className={classes.customExpandPanel}>
                                        <div
                                            className={
                                                classes.checkboxAndRadio +
                                                ' ' +
                                                classes.checkboxAndRadioHorizontal
                                            }
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(27)}
                                                        checked={
                                                            this.state.checked.indexOf(27) !== -1
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
                                                label='All'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(28)}
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
                                                label='Black'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(29)}
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
                                                label='Blue'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(30)}
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
                                                label='Brown'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(31)}
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
                                                label='Gray'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(32)}
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
                                                label='Green'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(33)}
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
                                                label='Neutrals'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this.handleToggle(34)}
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
                                                label='Purple'
                                            />
                                        </div>
                                    </div>
                                ),
                            },
                        ]}
                />
            </div>

        )
    }
}
export default withStyles(styles)(CheckBox)
