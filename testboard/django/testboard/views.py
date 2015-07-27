from django.contrib.auth.decorators import login_required
from splunkdj.decorators.render import render_to

@render_to('testboard:home.html')
@login_required
def home(request):
    return {
        "message": "Hello World from testboard!",
        "app_name": "testboard"
    }

@render_to('testboard:trying.html')
@login_required
def trying(request):
	return{
		"message": "Hello",
		"app_name": "testboard"
	}