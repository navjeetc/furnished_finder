/**
 * Select All and Delete Automation Script
 *
 * This script automates the process of selecting all items and deleting them
 * from a web interface that has checkbox selection functionality.
 */

/**
 * Main function to select all items and trigger delete action
 * @param {string} section - Either 'matched' or 'unmatched'
 */
function selectAllAndDelete(section = 'matched') {
  const isMatched = section === 'matched';
  const checkboxId = isMatched ? 'MatchedcheckAll' : 'UnmatchedcheckAll';
  const deleteButtonId = isMatched ? 'matchedDelAll' : 'unmatchedDelAll';

  console.log(`=== Select All and Delete (${section}) ===`);

  try {
    // Step 1: Click the select all checkbox
    const selectAllCheckbox = document.getElementById(checkboxId);
    if (!selectAllCheckbox) {
      throw new Error(`Select All checkbox for ${section} not found`);
    }

    selectAllCheckbox.click();
    console.log(`Clicked ${section} Select All checkbox`);

    // Step 2: Wait a moment, then handle the delete button
    setTimeout(() => {
      const deleteButton = document.getElementById(deleteButtonId);
      if (!deleteButton) {
        console.error(`Delete button for ${section} not found`);
        return;
      }

      console.log(`Delete button (${section}) current state:`);
      console.log('- Display:', window.getComputedStyle(deleteButton).display);
      console.log('- Classes:', deleteButton.className);

      // Force the delete button to be visible
      deleteButton.classList.remove('hide');
      deleteButton.style.display = 'inline-block';
      deleteButton.style.visibility = 'visible';

      console.log(`Forced ${section} delete button to be visible`);

      // Click the delete button
      deleteButton.click();
      console.log(`Successfully clicked ${section} delete button`);
    }, 300);

  } catch (error) {
    console.error(`Error in selectAllAndDelete for ${section}:`, error);
  }
}

/**
 * Alternative version that manually sets checkbox states and triggers change events
 * @param {string} section - Either 'matched' or 'unmatched'
 */
function selectAllAndDeleteManual(section = 'matched') {
  const isMatched = section === 'matched';
  const checkboxId = isMatched ? 'MatchedcheckAll' : 'UnmatchedcheckAll';
  const deleteButtonId = isMatched ? 'matchedDelAll' : 'unmatchedDelAll';

  console.log(`=== Manual Select All and Delete (${section}) ===`);

  try {
    // Step 1: Manually set checkbox states
    const selectAllCheckbox = document.getElementById(checkboxId);
    if (!selectAllCheckbox) {
      throw new Error(`Select All checkbox for ${section} not found`);
    }

    // Set the select all checkbox to checked
    selectAllCheckbox.checked = true;

    // Trigger the change event that should update the UI
    selectAllCheckbox.dispatchEvent(new Event('change'));
    console.log(`Triggered change event on ${section} select all checkbox`);

    // Step 2: Handle delete button after change event
    setTimeout(() => {
      const deleteButton = document.getElementById(deleteButtonId);
      if (!deleteButton) {
        console.error(`Delete button for ${section} not found`);
        return;
      }

      // Force delete button to be visible and clickable
      deleteButton.classList.remove('hide');
      deleteButton.style.display = 'inline-block';
      deleteButton.style.visibility = 'visible';

      // Click the delete button
      deleteButton.click();
      console.log(`Successfully clicked ${section} delete button`);

    }, 200);

  } catch (error) {
    console.error(`Error in selectAllAndDeleteManual for ${section}:`, error);
  }
}

/**
 * Debug function to inspect both matched and unmatched sections
 */
function debugSelectAllAndDelete() {
  console.log('=== Debug Select All and Delete ===');

  // Check matched section
  const matchedCheckbox = document.getElementById('MatchedcheckAll');
  const matchedDeleteButton = document.getElementById('matchedDelAll');

  // Check unmatched section
  const unmatchedCheckbox = document.getElementById('UnmatchedcheckAll');
  const unmatchedDeleteButton = document.getElementById('unmatchedDelAll');

  console.log('MATCHED SECTION:');
  console.log('- Select All checkbox found:', !!matchedCheckbox);
  console.log('- Delete button found:', !!matchedDeleteButton);
  if (matchedCheckbox) {
    console.log('- Checkbox state:', matchedCheckbox.checked);
  }
  if (matchedDeleteButton) {
    console.log('- Delete button display:', window.getComputedStyle(matchedDeleteButton).display);
  }

  console.log('UNMATCHED SECTION:');
  console.log('- Select All checkbox found:', !!unmatchedCheckbox);
  console.log('- Delete button found:', !!unmatchedDeleteButton);
  if (unmatchedCheckbox) {
    console.log('- Checkbox state:', unmatchedCheckbox.checked);
  }
  if (unmatchedDeleteButton) {
    console.log('- Delete button display:', window.getComputedStyle(unmatchedDeleteButton).display);
  }
}

/**
 * Utility function to wait for an element to become visible
 * @param {string} selector - CSS selector for the element
 * @param {number} timeout - Maximum time to wait in milliseconds
 * @returns {Promise<Element>} - Promise that resolves with the element
 */
function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    function check() {
      const element = document.querySelector(selector);
      if (element && element.style.display !== 'none' && !element.classList.contains('hide')) {
        resolve(element);
      } else if (Date.now() - startTime > timeout) {
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      } else {
        setTimeout(check, 50);
      }
    }

    check();
  });
}

/**
 * Enhanced version with better error handling and waiting
 * @param {string} section - Either 'matched' or 'unmatched'
 */
async function selectAllAndDeleteEnhanced(section = 'matched') {
  const isMatched = section === 'matched';
  const checkboxId = isMatched ? 'MatchedcheckAll' : 'UnmatchedcheckAll';
  const deleteButtonId = isMatched ? 'matchedDelAll' : 'unmatchedDelAll';

  console.log(`=== Enhanced Select All and Delete (${section}) ===`);

  try {
    // Step 1: Select all items
    const selectAllCheckbox = document.getElementById(checkboxId);
    if (!selectAllCheckbox) {
      throw new Error(`Select All checkbox for ${section} not found`);
    }

    selectAllCheckbox.click();
    console.log(`Clicked ${section} Select All checkbox`);

    // Step 2: Wait for delete button and click it
    setTimeout(() => {
      const deleteButton = document.getElementById(deleteButtonId);
      if (deleteButton) {
        // Force visibility and click
        deleteButton.classList.remove('hide');
        deleteButton.style.display = 'inline-block';
        deleteButton.style.visibility = 'visible';
        deleteButton.click();
        console.log(`Successfully completed ${section} select all and delete`);
      } else {
        console.error(`Delete button for ${section} not found`);
      }
    }, 300);

  } catch (error) {
    console.error(`Error in enhanced select all and delete for ${section}:`, error);
  }
}

/**
 * Direct approach to select all and delete
 * @param {string} section - Either 'matched' or 'unmatched'
 */
function directSelectAndDelete(section = 'matched') {
  const isMatched = section === 'matched';
  const checkboxId = isMatched ? 'MatchedcheckAll' : 'UnmatchedcheckAll';
  const deleteButtonId = isMatched ? 'matchedDelAll' : 'unmatchedDelAll';

  console.log(`=== Direct Select and Delete (${section}) ===`);

  try {
    // Find the checkbox by ID
    const checkbox = document.getElementById(checkboxId);
    if (!checkbox) {
      console.error(`Checkbox with ID ${checkboxId} not found`);
      return;
    }

    console.log(`Found ${section} checkbox:`, checkbox);

    // Check if the checkbox has the onchange attribute
    const onChangeAttr = checkbox.getAttribute('onchange');
    console.log(`Checkbox onchange attribute: ${onChangeAttr}`);

    // Set checked state directly
    checkbox.checked = true;
    console.log(`Set ${section} checkbox to checked`);

    // If there's an onchange function, try to call it directly
    if (onChangeAttr && window[onChangeAttr]) {
      window[onChangeAttr]();
      console.log(`Called onchange function: ${onChangeAttr}`);
    } else {
      // Trigger change event manually
      const event = new Event('change', { bubbles: true });
      checkbox.dispatchEvent(event);
      console.log(`Dispatched change event on ${section} checkbox`);
    }

    // Wait a bit for any UI updates
    setTimeout(() => {
      // Find the delete button
      const deleteButton = document.getElementById(deleteButtonId);
      if (!deleteButton) {
        console.error(`Delete button with ID ${deleteButtonId} not found`);
        return;
      }

      console.log(`Found ${section} delete button:`, deleteButton);

      // Make sure it's visible
      deleteButton.classList.remove('hide');
      deleteButton.style.display = 'inline-block';
      deleteButton.style.visibility = 'visible';

      // Click it
      deleteButton.click();
      console.log(`Clicked ${section} delete button`);
    }, 500); // Longer timeout to ensure UI updates

  } catch (error) {
    console.error(`Error in directSelectAndDelete for ${section}:`, error);
  }
}

/**
 * Directly check all individual checkboxes in a section
 * @param {string} section - Either 'matched' or 'unmatched'
 */
function checkAllIndividualCheckboxes(section = 'matched') {
  const checkboxClass = section === 'matched' ? 'matchedL' : 'unmatchedL';

  console.log(`=== Checking all individual ${section} checkboxes ===`);

  try {
    // Find all individual checkboxes with the appropriate class
    const checkboxes = document.querySelectorAll(`.custom-control-input.${checkboxClass}`);

    console.log(`Found ${checkboxes.length} individual ${section} checkboxes`);

    // Check each checkbox and trigger its change event
    checkboxes.forEach((checkbox, index) => {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));

      if (index < 5 || index >= checkboxes.length - 5) {
        console.log(`Checked checkbox ID: ${checkbox.id}`);
      } else if (index === 5) {
        console.log(`... (${checkboxes.length - 10} more) ...`);
      }
    });

    console.log(`Successfully checked all ${checkboxes.length} ${section} checkboxes`);

    // Now handle the delete button
    setTimeout(() => {
      const deleteButtonId = section === 'matched' ? 'matchedDelAll' : 'unmatchedDelAll';
      const deleteButton = document.getElementById(deleteButtonId);

      if (!deleteButton) {
        console.error(`Delete button for ${section} not found`);
        return;
      }

      // Make sure it's visible
      deleteButton.classList.remove('hide');
      deleteButton.style.display = 'inline-block';
      deleteButton.style.visibility = 'visible';

      // Click it
      deleteButton.click();
      console.log(`Clicked ${section} delete button`);
    }, 500);

  } catch (error) {
    console.error(`Error in checkAllIndividualCheckboxes for ${section}:`, error);
  }
}

/**
 * Complete solution that checks both the "Select All" checkbox and all individual checkboxes
 * @param {string} section - Either 'matched' or 'unmatched'
 */
function completeSelectAllAndDelete(section = 'matched') {
  const isMatched = section === 'matched';
  const checkboxId = isMatched ? 'MatchedcheckAll' : 'UnmatchedcheckAll';
  const checkboxClass = isMatched ? 'matchedL' : 'unmatchedL';
  const deleteButtonId = isMatched ? 'matchedDelAll' : 'unmatchedDelAll';

  console.log(`=== Complete Select All and Delete (${section}) ===`);

  try {
    // Step 1: Check the "Select All" checkbox
    const selectAllCheckbox = document.getElementById(checkboxId);
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = true;
      selectAllCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
      console.log(`Checked the ${section} "Select All" checkbox`);
    }

    // Step 2: Directly check all individual checkboxes
    const checkboxes = document.querySelectorAll(`.custom-control-input.${checkboxClass}`);
    console.log(`Found ${checkboxes.length} individual ${section} checkboxes`);

    checkboxes.forEach(checkbox => {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    });

    console.log(`Checked all ${checkboxes.length} individual ${section} checkboxes`);

    // Step 3: Handle the delete button
    setTimeout(() => {
      const deleteButton = document.getElementById(deleteButtonId);
      if (!deleteButton) {
        console.error(`Delete button for ${section} not found`);
        return;
      }

      // Make sure it's visible
      deleteButton.classList.remove('hide');
      deleteButton.style.display = 'inline-block';
      deleteButton.style.visibility = 'visible';

      // Click it
      deleteButton.click();
      console.log(`Clicked ${section} delete button`);
    }, 500);

  } catch (error) {
    console.error(`Error in completeSelectAllAndDelete for ${section}:`, error);
  }
}

// Export functions for use (if in a module environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    selectAllAndDelete,
    selectAllAndDeleteManual,
    debugSelectAllAndDelete,
    selectAllAndDeleteEnhanced,
    waitForElement,
    directSelectAndDelete,
    checkAllIndividualCheckboxes,
    completeSelectAllAndDelete
  };
}

// Usage Examples:
// 1. Basic usage for matched items: selectAllAndDelete('matched');
// 2. Basic usage for unmatched items: selectAllAndDelete('unmatched');
// 3. Debug mode: debugSelectAllAndDelete();
// 4. Manual mode: selectAllAndDeleteManual('matched');
// 5. Enhanced mode: selectAllAndDeleteEnhanced('unmatched');
// 6. Direct mode: directSelectAndDelete('unmatched');
// 7. Check all individual checkboxes: checkAllIndividualCheckboxes('unmatched');
// 8. Complete solution: completeSelectAllAndDelete('unmatched');

// This command works for unmatched requests:
//  completeSelectAllAndDelete('unmatched');
