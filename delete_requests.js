/**
 * Select All and Delete Automation Script
 *
 * This script automates the process of selecting all items and deleting them
 * from a web interface that has checkbox selection functionality.
 */

/**
 * Main function to select all items and trigger delete action
 * This version forces the delete button to be visible if it gets hidden
 */
function selectAllAndDelete() {
  console.log('=== Select All and Delete ===');

  try {
    // Step 1: Click the select all checkbox
    const selectAllCheckbox = document.getElementById('MatchedcheckAll');
    if (!selectAllCheckbox) {
      throw new Error('Select All checkbox not found');
    }

    selectAllCheckbox.click();
    console.log('Clicked Select All checkbox');

    // Step 2: Wait a moment, then handle the delete button
    setTimeout(() => {
      const deleteButton = document.getElementById('matchedDelAll');
      if (!deleteButton) {
        console.error('Delete button not found');
        return;
      }

      console.log('Delete button current state:');
      console.log('- Display:', window.getComputedStyle(deleteButton).display);
      console.log('- Classes:', deleteButton.className);

      // Force the delete button to be visible (removes 'hide' class and sets display)
      deleteButton.classList.remove('hide');
      deleteButton.style.display = 'inline-block';
      deleteButton.style.visibility = 'visible';

      console.log('Forced delete button to be visible');

      // Click the delete button
      deleteButton.click();
      console.log('Successfully clicked delete button');

    }, 300); // 300ms delay to ensure DOM updates

  } catch (error) {
    console.error('Error in selectAllAndDelete:', error);
  }
}

/**
 * Alternative version that manually sets checkbox states and triggers change events
 * Use this if the click-based approach doesn't work consistently
 */
function selectAllAndDeleteManual() {
  console.log('=== Manual Select All and Delete ===');

  try {
    // Step 1: Manually set checkbox states
    const selectAllCheckbox = document.getElementById('MatchedcheckAll');
    if (!selectAllCheckbox) {
      throw new Error('Select All checkbox not found');
    }

    // Set the select all checkbox to checked
    selectAllCheckbox.checked = true;

    // Also manually check any individual item checkboxes that should be selected
    const itemCheckbox = document.getElementById('241635999'); // Adjust ID as needed
    if (itemCheckbox) {
      itemCheckbox.checked = true;
      console.log('Manually checked individual item checkbox');
    }

    // Trigger the change event that should update the UI
    selectAllCheckbox.dispatchEvent(new Event('change'));
    console.log('Triggered change event on select all checkbox');

    // Step 2: Handle delete button after change event
    setTimeout(() => {
      const deleteButton = document.getElementById('matchedDelAll');
      if (!deleteButton) {
        console.error('Delete button not found');
        return;
      }

      console.log('After manual change - Delete button display:',
                  window.getComputedStyle(deleteButton).display);

      // Force delete button to be visible and clickable
      deleteButton.classList.remove('hide');
      deleteButton.style.display = 'inline-block';
      deleteButton.style.visibility = 'visible';

      // Click the delete button
      deleteButton.click();
      console.log('Successfully clicked delete button');

    }, 200);

  } catch (error) {
    console.error('Error in selectAllAndDeleteManual:', error);
  }
}

/**
 * Debug function to inspect the current state of checkboxes and buttons
 * Useful for troubleshooting when the automation doesn't work as expected
 */
function debugSelectAllAndDelete() {
  console.log('=== Debug Select All and Delete ===');

  // Check for select all checkbox
  const selectAllCheckbox = document.getElementById('MatchedcheckAll');
  const deleteButton = document.getElementById('matchedDelAll');

  console.log('Select All checkbox found:', !!selectAllCheckbox);
  console.log('Delete button found:', !!deleteButton);

  if (selectAllCheckbox) {
    console.log('Select All checkbox state:', {
      checked: selectAllCheckbox.checked,
      disabled: selectAllCheckbox.disabled,
      className: selectAllCheckbox.className
    });
  }

  if (deleteButton) {
    console.log('Delete button state:', {
      classes: deleteButton.className,
      styleDisplay: deleteButton.style.display,
      computedDisplay: window.getComputedStyle(deleteButton).display,
      disabled: deleteButton.disabled
    });
  }

  // Find all checkboxes to understand the page structure
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  console.log('All checkboxes on page:', allCheckboxes.length);

  allCheckboxes.forEach((checkbox, index) => {
    if (checkbox.className.includes('matchedL')) {
      console.log(`Matched checkbox ${index}:`, {
        id: checkbox.id,
        name: checkbox.name,
        checked: checkbox.checked,
        className: checkbox.className
      });
    }
  });
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
 */
async function selectAllAndDeleteEnhanced() {
  console.log('=== Enhanced Select All and Delete ===');

  try {
    // Step 1: Select all items
    const selectAllCheckbox = document.getElementById('MatchedcheckAll');
    if (!selectAllCheckbox) {
      throw new Error('Select All checkbox not found');
    }

    selectAllCheckbox.click();
    console.log('Clicked Select All checkbox');

    // Step 2: Wait for delete button and click it
    setTimeout(() => {
      const deleteButton = document.getElementById('matchedDelAll');
      if (deleteButton) {
        // Force visibility and click
        deleteButton.classList.remove('hide');
        deleteButton.style.display = 'inline-block';
        deleteButton.click();
        console.log('Successfully completed select all and delete');
      } else {
        console.error('Delete button not found');
      }
    }, 300);

  } catch (error) {
    console.error('Error in enhanced select all and delete:', error);
  }
}

// Export functions for use (if in a module environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    selectAllAndDelete,
    selectAllAndDeleteManual,
    debugSelectAllAndDelete,
    selectAllAndDeleteEnhanced,
    waitForElement
  };
}

// Usage Examples:
// 1. Basic usage: selectAllAndDelete();
// 2. Debug mode: debugSelectAllAndDelete();
// 3. Manual mode: selectAllAndDeleteManual();
// 4. Enhanced mode: selectAllAndDeleteEnhanced();