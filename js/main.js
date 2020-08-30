/**
 * GNU General Public License v3.0
 * Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.
 */

$(document).ready(function() {
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

    let minOddsMsg = `Your minimum required odds to succeed are <strong>${odds}%.</strong>`

    if (hand < odds) {
      $decision.html(`<div class="alert alert-danger" role="alert"><p><strong>Your will statistically fail.</strong> ${minOddsMsg}<br />You estimated your capabilities on only <strong>${hand}%.</strong></p><p class="mt-4">Improve your skills or adjust your situation towards a more statistically favorable outcome.</p></div>`);
    } else {
      $decision.html(`<div class="alert alert-success" role="alert"><p><strong>You will statistically succeed!</strong> ${minOddsMsg}<br />You estimated your capabilities on <strong>${hand}%.</strong></p><p>Go ahead and good luck!</p></div>`);
    }
  });
});
