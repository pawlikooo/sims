$(document).ready(function() {
  var $alerts = $('#main .alerts')
  var $usersTable = $('#main .users table')
  var $users = $('#main .users table tbody tr td')
  var $userInfo = $('#main .userInfo')

  function showAlert(type, content) {
    $alerts.hide(100, function() {
      $alerts.html(
        '<div class=' + type + '>' + content + '</div>'
      ).show(250)
    })
  }

  $alerts.click(function() {
    $alerts.hide(200, function() {})
  })

  $userInfo.click(function() {
    $userInfo.hide(200, function() {})
  })

  $('.infopic').click(function() {
    var id = $(this).parent().parent().attr('id')

    $.ajax({
      url: '/admin/userinfo/' + id,
      type: 'GET',
      dataType: 'html',
      success: function(data) {
        $userInfo.html(data).show(250)
      },
      error: function(xhr, err, status) {
        showAlert('error', xhr.responseText)
      }
    })
  })

  $('.delpic').click(function() {
    var parent = $(this).parent().parent()
    var id = parent.attr('id')

    $.ajax({
      url: '/users/' + id,
      type: 'DELETE',
      dataType: 'json',
      success: function(data) {
        parent.hide(250)
      },
      error: function(xhr, err, status) {
        showAlert('error', xhr.responseText)
      }
    })
  })
})