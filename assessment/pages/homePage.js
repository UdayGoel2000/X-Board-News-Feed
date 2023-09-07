
import basePage from './basePage';

/**
 * This project is inspired from git@github.com:qualityshepherd/cypress-example.git
 * We have an extended version of this project for our testing.
 * Cypress seems to think having selectors in tests is ok? [SPOILER] it's not.
 * Nor is it good to have them in your page methods... so I'm just declaring
 * them as css strings and then use these in our methods.
 * Ie, we need only change the single var if the app's css changes
 *
 * Also, IMO, Cypress' view on page objects is _at best_ misguided
 */
const homePage = {
  url:            '/',
  accordianButtonElement: 'button',

  /**
   * test if post title exists
   * @param  {string} postTitle
   * @return {bool}
   */
  allAccordianButtons() {
    let allButtons = cy.get(this.accordianButtonElement);
    return allButtons
        .filter((index, element) =>
            element.getAttributeNames()
                .find(value => value === 'data-toggle' || value === 'data-bs-toggle'));
  },

  firstAccordian() {
    return homePage.firstAccordianButton().then(btn => {
      let dataTarget;
      if (btn.attr('data-target')) {
        dataTarget = btn.attr('data-target')
      } else {
        dataTarget = btn.attr('data-bs-target');
      }
      return homePage.getElement(dataTarget);
    });
  },


  firstCarousel() {
    return this.firstAccordianButton().then(btn => {
      let dataTarget;
      if (btn.attr('data-target')) {
        dataTarget = btn.attr('data-target')
      } else {
        dataTarget = btn.attr('data-bs-target');
      }
      return this.getElement(dataTarget + '> .carousel-item .active');
    });
  },

  firstAccordianButton() {
    let allButtons = cy.get(this.accordianButtonElement);
    return allButtons
        .filter((index, element) =>
            element.getAttributeNames()
                .find(value => value === 'data-toggle' || value === 'data-bs-toggle'))
        .its(0);
  },

  getElement(divId) {
    return cy.get(divId);
  }

}
export default {...basePage, ...homePage}

