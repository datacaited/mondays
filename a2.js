$(document).ready(function(){
  $('#searchButton').bind('click',function(e){
		e.preventDefault();
		var text='text='+$('#searchbar').val();
		$.ajax({
			dataType:'xml',
			url:'getThumbs.php',
			type: 'POST',
			data: text,
			success: function(response){
				console.log("thank god something is showing here");
				$('#responseDiv').html('');
				var xmlstring = response;
				$(xmlstring).find('photo').each(function(i){
											
						var farm=$(this).attr('farm');
						var server=$(this).attr('server');
						var id=$(this).attr('id');
						var secret=$(this).attr('secret');
						var imgurl='http://farm'+farm+'.';
						imgurl+='staticflickr.com/'+server;
						imgurl+='/'+id+'_'+secret+'.jpg';
						$('#responseDiv').append('<li><img class=img_main_list src='+imgurl+' alt='+id+'></li>');
			
				});
				$('#responseDiv img').attr('class','responseDiv').bind('click',function(i){
					var photoId='photoId='+$(this).attr('alt');
					$.ajax({
						dataType:'xml',
						url:'getPhoto.php',
						type:'POST',
						data: photoId,
						success: function(response){
							var xmlstring=response;
							console.log(xmlstring);
							$(xmlstring).find('photo').each(function(){
								$('#photo_info').html('');
								$('#responseDiv2').html('');
								var farm=$(this).attr('farm');
								var server=$(this).attr('server');
								var id=$(this).attr('id');
								var secret=$(this).attr('secret');
								var imgurl='http://farm'+farm+'.';
								imgurl += 'staticflickr.com/'+server;
								imgurl += '/'+id+'_'+secret+'.jpg';
								var date = $(xmlstring).find('photo dates').attr('taken');
								newdate(date);
								$('#photo_info').append("<img src="+imgurl+" alt=" +id+" class='full_img' />");
								$('#responseDiv2').append('<h2>'+$(xmlstring).find('photo title').text()+'</h2>');
								$('#responseDiv2').append('<p>'+$(xmlstring).find('photo owner').attr('username')+'</p>');															
								$('#responseDiv2').append('<p>'+finaldate+'</p>');
							});
						},
						error: function(response){
							console.log("error response is: " + response);
						}
					});
				});
			},
			error: function(response){
				console.log("error response is: " + response);
			}
			
		});
	});
});

function newdate(date){
	var split_one = date.split(' ');	
	var split_two = split_one[0].split('-');
	var year = split_two[0];
	var month = split_two[1];
	var day = split_two[2];
	
	if(month == 3)
		month='March ';
	day += ', ';		

	finaldate = month + day + year;

	
}
