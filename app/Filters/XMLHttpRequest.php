<?php namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class XMLHttpRequest implements FilterInterface
{
	public function before(RequestInterface $request, $arguments = null)
	{
		if ($request->isAJAX())
		{
			return;
		}

		return service('response')->setBody(view('layout'));
	}

	public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
	{
	}
}
