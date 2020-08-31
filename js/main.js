/**
 * GNU General Public License v3.0
 * Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.
 */

$(document).ready(function() {
  let addPotItem = function() {
    let $potItemTemplate = `
      <div class="sententia-pot-item-group input-group mb-3">
        <input type="text" placeholder="Describe the pro/con and define its (positive/negative) value" class="form-control w-100 item-desc" aria-label="Describe the PRO/CON">

        <div class="input-group-prepend">
          <span class="input-group-text">$</span>
        </div>

        <input type="number" value="0" class="form-control sententia-pot-item" aria-label="Positive/Negative worth">
      </div>
      `;

    $('#sententia-form-body').append($potItemTemplate);
  };

  $(document).on("click", "#sententia-calculate", function(e) {
    e.preventDefault();

    let $form = $('#sententia');
    let $potItems = $form.find('input.sententia-pot-item');
    let $hand = $form.find('input#sententia-hand');
    let $decision = $form.find('#sententia-decision');

    let pot = 0;
    let hand = parseFloat($hand.val()).toFixed(2);
    let bet = 0;

    $potItems.each(function (k, v) {
      let $item = $(v);

      let item = parseInt($item.val());
      let absItem = Math.abs(item);
      let isBet = item < 0;

      pot += absItem;

      if (isBet) {
        bet += absItem
      }
    });

    let maxRisk = (bet / pot) * 100;
    let odds = maxRisk.toFixed(2);

    let minOddsMsg = `<p class="pt-1">When you make this decision, you need to successfully execute it more than <strong>${odds}%</strong> of the time in order to profit from it in long-term.</p>`;

    if (hand < odds) {
      $decision.html(`<div class="alert alert-danger" role="alert"><p><strong>Your will statistically fail.</strong> ${minOddsMsg}You estimated your capabilities on only <strong>${hand}%.</strong></p><p class="mt-4">Improve your skills or adjust your situation towards a more statistically favorable outcome.</p></div>`);
    } else {
      let alertColor = 'alert-success';
      let alertExtraWarningMsg = '';

      if (hand - odds < 20) {
        alertColor = 'alert-warning';
        alertExtraWarningMsg = ' BUT it is very close - careful!';
      }

      $decision.html(`<div class="alert ${alertColor}" role="alert"><p><strong>You will statistically succeed!</strong> ${alertExtraWarningMsg} ${minOddsMsg}You estimated your capabilities on <strong>${hand}%.</strong></p><p>Go ahead and good luck!</p></div>`);
    }
  });

  $(document).on('change', '#sententia-hand', function (e) {
    let max = parseInt($(this).attr('max'));
    let min = parseInt($(this).attr('min'));

    if ($(this).val() > max) {
      $(this).val(max);
    }
    else if ($(this).val() < min) {
      $(this).val(min);
    }
  });

  $(document).on('click', '#sententia-reset', function (e) {
    e.preventDefault();

    // Reset textarea
    $('#sententia-description-textarea').val('');

    // Reset all PROs/CONs
    $('.sententia-pot-item-group').remove();

    // Reset chances
    $('#sententia-hand').val(40);

    // Reset decision
    $('#sententia-decision').html('');

    // Add a default PRO/CON
    addPotItem();
  });

  $(document).on('click', '#sententia-pot-add', function (e) {
    e.preventDefault();

    addPotItem();
  })
});
