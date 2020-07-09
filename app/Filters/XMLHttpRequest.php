<?php namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class XMLHttpRequest implements FilterInterface
{
	public function before(RequestInterface $request)
	{
		if ($request->isAJAX())
		{
			return;
		}

		return service('response')->setBody(service('renderer')->render('layout'));
	}

	public function after(RequestInterface $request, ResponseInterface $response)
	{
	}
}
