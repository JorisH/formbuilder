<?php

/**
 * form actions.
 *
 * @package    .
 * @subpackage form
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 2692 2006-11-15 21:03:55Z fabien $
 */
class formActions extends sfActions
{
  /**
   * Executes index action
   *
   */
  public function executeIndex()
  {
    
  }

  public function executeUpdate()
  {
    $data = json_decode($this->getRequestParameter('data'));
    $builder = $this->createFormBuilder([]);

    foreach($data->children as $child) {
      $builder->add($child->name, $child->type);
    }

    return $builder->getForm()->createView();
  }

  public function createFormBuilder($data = null, array $options = array())
  {
    return $this->getContainer()->get('form.factory')->createBuilder('form', $data, $options);
  }
}
